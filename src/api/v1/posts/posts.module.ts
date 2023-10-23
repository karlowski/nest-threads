import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { PostEntity } from './entities/post.entity';
import { CommentEntity } from 'src/api/v1/comments/entities/comment.entity';
import { SharedModule } from 'src/shared/shared.module';
import { UserEntity } from 'src/api/v1/users/entities/user.entity';

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
