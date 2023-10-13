import { Controller, UseGuards, Get, Param, Post, Body, Delete, ParseIntPipe, } from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from 'src/dto/create-comment-dto';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { UserComment } from 'src/interfaces/comment.interface';

@UseGuards(AuthGuard)
@Controller('comments')
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
