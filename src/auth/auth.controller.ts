import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/dto/login-user.dto';
import { AccessToken } from 'src/interfaces/access-token.interface';
import { SerializedUser } from 'src/types/serialized-user';
import { ApiResponse } from 'src/interfaces/api-response.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() { email, password }: LoginUserDto, @Req() req: Request): Promise<AccessToken> {
    return this.authService.signIn(email, password, req);
  }

  @Post('sign-up')
  async signUp(@Body() user: CreateUserDto): Promise<ApiResponse<SerializedUser>> {
    return this.authService.signUp(user);
  }
}
