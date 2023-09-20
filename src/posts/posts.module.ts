import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UserPost } from './post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserPost])],
  providers: [PostsService],
  controllers: [PostsController]
})
export class PostsModule {}
