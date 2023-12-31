import { Controller, UseGuards, Get, Param, Post, Body, Delete, ParseIntPipe, } from '@nestjs/common';

import { AuthGuard } from 'src/api/v1/auth/guards/auth.guard';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from 'src/api/v1/comments/dto/create-comment-dto';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { UserComment } from 'src/api/v1/comments/interfaces/comment.interface';

@UseGuards(AuthGuard)
@Controller({
  path: 'comments',
  version: '1'
})
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get('/userId/:userId')
  getAllForUser(@Param('userId', ParseIntPipe) userId: number): Promise<UserComment[]> {
    return this.commentsService.getAllFromUser(userId);
  }

  @Get('/postId/:postId')
  getAllForPost(@Param('postId', ParseIntPipe) postId: number): Promise<UserComment[]> {
    return this.commentsService.getAllForPost(postId);
  }

  @Post()
  create(@Body() commentData: CreateCommentDto): Promise<ApiResponse<UserComment>> {
    return this.commentsService.create(commentData);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<ApiResponse<null>> {
    return this.commentsService.delete(id);
  }
}
