import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { UserComment } from './comment.entity';
import { UserPost } from 'src/posts/post.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserComment, UserPost])
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
