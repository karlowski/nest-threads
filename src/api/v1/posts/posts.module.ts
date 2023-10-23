import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PostEntity } from './post.entity';
import { CommentEntity } from 'src/api/v1/comments/comment.entity';
import { SharedModule } from 'src/shared/shared.module';
import { UserEntity } from 'src/api/v1/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, PostEntity, CommentEntity]),
    SharedModule
  ],
  providers: [PostsService],
  controllers: [PostsController],
  exports: [PostsService]
})
export class PostsModule {}
