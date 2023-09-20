import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

import { CreateUserDto } from 'src/dto/create-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-in')
  async signIn(@Body() signInUserDto: Record<string, any>, @Req() req: Request): Promise<any> {
    return this.authService.signIn(signInUserDto.email, signInUserDto.password, req);
  }

  @Post('sign-up')
  async signUp(@Body() signInUserDto: CreateUserDto): Promise<any> {
    return this.authService.signUp(signInUserDto);
  }
}
