import { Body, Controller, Delete, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { LikesService } from './likes.service';
import { CreateLikeDto } from 'src/dto/create-like.dto';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { UserLike } from 'src/interfaces/like.interface';

@Controller('likes')
@UseGuards(AuthGuard)
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
