import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserPost } from './post.entity';
import { UserComment } from 'src/comments/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPost, UserComment])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
