import { ClassSerializerInterceptor, Controller, Get, Param, ParseIntPipe, UseGuards, UseInterceptors } from '@nestjs/common';

import { AuthGuard } from 'src/api/v1/auth/guards/auth.guard';
import { UsersService } from '../services/users.service';
import { SerializedUser } from 'src/api/v1/users/types/serialized-user';

@UseGuards(AuthGuard)
@UseInterceptors(ClassSerializerInterceptor)
@Controller({
  path: 'users',
  version: '1'
})
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
