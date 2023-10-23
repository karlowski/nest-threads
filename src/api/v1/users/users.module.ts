import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { UserEntity } from './entities/user.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    SharedModule
  ],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService]
})
export class UsersModule {}

