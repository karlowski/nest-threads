import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
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
        throw new BadRequestException({ message: 'Wrong password or email', });
      }

      const token = await this.jwtService.signAsync({ sub: user.id, username: user.username });

      req.headers['authorization'] = `Bearer ${token}`;

      await this.usersService.update({ ...user, lastTimeOnline: this.timeService.catchActivityTime() });

      return {
        access_token: token
      } 
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signUp({ email, username, password }: CreateUserDto): Promise<any> {
    try {
      const cryptedPassword = await bcrypt.hash(password, 10);
      const creationTime = this.timeService.catchActivityTime();
      const newUser = { 
        username, 
        email, 
        password: cryptedPassword, 
        creationTime, 
        lastTimeOnline: creationTime 
      };

      return await this.usersService.create(newUser);  
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
