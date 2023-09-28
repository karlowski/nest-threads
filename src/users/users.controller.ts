import { Controller, Get, UseGuards } from '@nestjs/common';

import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return await this.usersService.getAll();
  }
}
