import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

import { CreatePostDto } from 'src/dto/create-post.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { UserPost } from 'src/interfaces/post.interface';
import { ApiResponse } from 'src/interfaces/api-response.interface';

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
  create(@Body() post: CreatePostDto): Promise<ApiResponse<UserPost>> {
    return this.postsService.create(post);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<UserPost>> {
    return this.postsService.delete(id);
  }
}
