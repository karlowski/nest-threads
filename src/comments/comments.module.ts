import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { CommentEntity } from './comment.entity';
import { PostEntity } from 'src/posts/post.entity';
import { SharedModule } from 'src/shared/shared.module';
import { UserEntity } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CommentEntity, PostEntity]),
    SharedModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
