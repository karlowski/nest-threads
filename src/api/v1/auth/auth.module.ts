import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from './services/auth.service';
import { LocalStrategy } from './local.strategy';
import { UserEntity } from 'src/api/v1/users/entities/user.entity';
import { UsersModule } from 'src/api/v1/users/users.module';
import { AuthController } from './controllers/auth.controller';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([UserEntity]),
    UsersModule,
    SharedModule
  ],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy]
})
export class AuthModule {}
