import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { TimeService } from 'src/shared/services/time.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private timeService: TimeService
  ) {}

  async signIn(email: string, password: string, req: Request): Promise<any> {
    const user = await this.usersService.getUserByEmail(email);

    if (!user) {
      throw new UnauthorizedException(); 
    }

    try {
      const isPasswordMatches = await bcrypt.compare(password, user.password);

      if (!isPasswordMatches) {
        throw new HttpException({ message: 'Wrong password or email', status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
      }

      const token = await this.jwtService.signAsync({ sub: user.id, username: user.username });

      req.headers['authorization'] = `Bearer ${token}`;

      await this.usersService.update({ ...user, lastTimeOnline: this.timeService.catchActivityTime() });

      return {
        access_token: token
      } 
    } catch ({ response, message, status }) {
      throw new HttpException({ message, status }, HttpStatus.BAD_REQUEST);
    }
  }

  async signUp(user: CreateUserDto): Promise<any> {
    try {
      const cryptedPassword = await bcrypt.hash(user.password, 10);
      const creationTime = this.timeService.catchActivityTime();
      const newUser = { username: user.username, email: user.email, password: cryptedPassword, creationTime, lastTimeOnline: creationTime };
      return await this.usersService.create(newUser);  
    } catch ({ response, message, status }) {
      throw new HttpException({ message, status }, HttpStatus.BAD_REQUEST);
    }
  }
}
