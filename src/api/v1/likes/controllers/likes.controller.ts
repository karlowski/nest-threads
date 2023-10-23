import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/api/v1/auth/guards/auth.guard';
import { LikesService } from '../services/likes.service';
import { CreateLikeDto } from 'src/api/v1/likes/dto/create-like.dto';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { UserLike } from 'src/api/v1/likes/interfaces/like.interface';

@UseGuards(AuthGuard)
@Controller({
  path: 'likes',
  version: '1'
})
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post()
  async create(@Body() like: CreateLikeDto): Promise<ApiResponse<UserLike>> {
    return this.likesService.create(like);
  }

  @Delete()
  async delete(@Body() { id, userId }: any): Promise<ApiResponse<null>> {
    return this.likesService.delete(id, userId);
  }
}
