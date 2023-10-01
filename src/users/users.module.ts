import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './user.entity';
import { UserExistenceInterceptor } from 'src/interceptors/user-existence.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    UsersService,
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: UserExistenceInterceptor,
    // },
  ],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}

