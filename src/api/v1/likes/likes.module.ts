import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { LikeEntity } from './like.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LikeEntity]),
    SharedModule
  ],
  controllers: [LikesController],
  providers: [LikesService]
})
export class LikesModule {}
