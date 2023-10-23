import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UsersService } from './users.service';
import { SerializedUser } from 'src/types/serialized-user';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  getById(@Param('id', ParseIntPipe) id: number): Promise<SerializedUser> {
    return this.usersService.getUserById(id);
  }

  @Get()
  getAll(): Promise<SerializedUser[]> {
    return this.usersService.getAll();
  }
}
