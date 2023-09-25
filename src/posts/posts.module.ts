import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserPost } from './post.entity';
import { UserComment } from 'src/comments/comment.entity';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserPost, UserComment]),
    SharedModule
  ],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
