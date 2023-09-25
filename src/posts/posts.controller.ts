import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreatePostDto } from 'src/dto/create-post.dto';
import { PostsService } from './posts.service';
import { UserPost } from './post.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('posts')
@UseGuards(AuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Get()
  async getAll(): Promise<UserPost[]> {
    return this.postsService.getAll();
  }

  @Get(':id')
  async getAllFromUser(@Param('id') id: number): Promise<UserPost[]> {
    return this.postsService.getAllFromUser(id);
  }

  @Post()
  async create(@Body() post: CreatePostDto): Promise<UserPost> {
    return this.postsService.create(post);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.postsService.delete(id);
  }
}
