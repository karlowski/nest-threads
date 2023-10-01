import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

import { CreatePostDto } from 'src/dto/create-post.dto';
import { PostsService } from './posts.service';
import { UserPost } from './post.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  getAll(): Promise<UserPost[]> {
    return this.postsService.getAll();
  }

  @Get(':id')
  getAllFromUser(@Param('id', ParseIntPipe) id: number): Promise<UserPost[]> {
    return this.postsService.getAllFromUser(id);
  }

  @Post()
  create(@Body() post: CreatePostDto): Promise<Record<string, string | UserPost>> {
    return this.postsService.create(post);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<Record<string, string | UserPost>> {
    return this.postsService.delete(id);
  }
}
