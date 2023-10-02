import { Body, Controller, Delete, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';

import { AuthGuard } from 'src/guards/auth/auth.guard';
import { LikesService } from './likes.service';
import { CreateLikeDto } from 'src/dto/create-like.dto';

@Controller('likes')
@UseGuards(AuthGuard)
export class LikesController {
  constructor(private likesService: LikesService) {}

  @Post()
  async create(@Body() like: CreateLikeDto): Promise<any> {
    return this.likesService.create(like);
  }

  @Delete()
  async delete(@Body() { id, userId }: any): Promise<any> {
    return this.likesService.delete(id, userId);
  }
}
