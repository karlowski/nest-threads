import { Controller, UseGuards, Get, Param, Post, Body, Delete, } from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CommentsService } from './comments.service';
import { UserComment } from './comment.entity';
import { CreateCommentDto } from 'src/dto/create-comment-dto';

@Controller('comments')
@UseGuards(AuthGuard)
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/userId/:userId')
  async getAllForUser(@Param('userId') userId: number): Promise<UserComment[]> {
    return this.commentsService.getAllFromUser(userId);
  }

  @Get('/postId/:postId')
  async getAllForPost(@Param('postId') postId: number): Promise<UserComment[]> {
    return this.commentsService.getAllForPost(postId);
  }

  @Post()
  async create(@Body() commentData: CreateCommentDto): Promise<UserComment> {
    return this.commentsService.create(commentData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<any> {
    return this.commentsService.delete(id);
  }
}
