import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserComment } from './comment.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserComment])
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
