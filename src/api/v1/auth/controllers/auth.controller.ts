import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateUserDto } from 'src/api/v1/users/dto/create-user.dto';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from 'src/api/v1/auth/dto/login-user.dto';
import { AccessToken } from 'src/api/v1/auth/interfaces/access-token.interface';
import { SerializedUser } from 'src/api/v1/users/types/serialized-user';
import { ApiResponse } from 'src/interfaces/api-response.interface';

@Controller({
  path: 'auth',
  version: '1'
})
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
