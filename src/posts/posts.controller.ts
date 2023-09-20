import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CreatePostDto } from 'src/dto/create-post.dto';
import { PostsService } from './posts.service';
import { UserPost } from './post.entity';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Get()
  async getAll(): Promise<UserPost[]> {
    return this.postsService.getAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getAllFromUser(@Param('id') id: number): Promise<UserPost[]> {
    return this.postsService.getAllFromUser(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() post: CreatePostDto): Promise<any> {
    return this.postsService.create(post);
  }
}
