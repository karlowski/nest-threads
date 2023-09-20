import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<User[]> {
    return await this.usersService.getAll();
  }
}
