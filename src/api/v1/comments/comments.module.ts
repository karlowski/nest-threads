import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { CommentEntity } from './entities/comment.entity';
import { PostEntity } from 'src/api/v1/posts/entities/post.entity';
import { SharedModule } from 'src/shared/shared.module';
import { UserEntity } from 'src/api/v1/users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, CommentEntity, PostEntity]),
    SharedModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
