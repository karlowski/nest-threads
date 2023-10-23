import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Request } from 'express';

import { UsersService } from 'src/api/v1/users/users.service';
import { CreateUserDto } from 'src/dto/create-user.dto';
import { TimeService } from 'src/shared/services/time.service';
import { AccessToken } from 'src/interfaces/access-token.interface';
import { SerializedUser } from 'src/types/serialized-user';
import { ApiResponse } from 'src/interfaces/api-response.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private timeService: TimeService
  ) {}

  async signIn(email: string, password: string, req: Request): Promise<AccessToken> {
    const user = await this.usersService.getUserByEmail(email);

    try {
      const isPasswordMatches = await bcrypt.compare(password, user.password);

      if (!isPasswordMatches) {
        throw new BadRequestException({ message: 'Wrong password or email', });
      }

      const token = await this.jwtService.signAsync({ 
        sub: user.id, 
        username: user.username 
      });

      req.headers['authorization'] = `Bearer ${token}`;

      await this.usersService.update(user.id, { 
        ...user, 
        lastTimeOnline: this.timeService.catchActivityTime() 
      });

      // TODO: general interface { message, data } with generic ???
      return {
        access_token: token
      } 
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async signUp({ email, username, password }: CreateUserDto): Promise<ApiResponse<SerializedUser>> {
    try {
      const cryptedPassword = await bcrypt.hash(password, 10);
      const newUser = await this.usersService.create({ 
        username,
        email,
        password: cryptedPassword
      });

      return { message: 'User created successfully', data: newUser };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
