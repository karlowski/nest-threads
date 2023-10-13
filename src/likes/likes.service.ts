import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LikeEntity } from './like.entity';
import { TimeService } from 'src/shared/services/time.service';
import { CreateLikeDto } from 'src/dto/create-like.dto';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { UserLike } from 'src/interfaces/like.interface';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(LikeEntity)
    private likesRepository: Repository<LikeEntity>,
    private timeService: TimeService
  ) {}

  async create(like: CreateLikeDto): Promise<ApiResponse<UserLike>> {
    const existingLike = await this.likesRepository.findOneBy(like);

    if (existingLike) {
      throw new HttpException({ message: 'Item already liked by this user' }, HttpStatus.BAD_REQUEST);
    }

    try {
      const createdLike = await this.likesRepository.create({ ...like, creationTime: this.timeService.catchActivityTime() });
      const savedLike = await this.likesRepository.save(createdLike);
      return { message: 'Item liked successfully', data: savedLike };
    } catch ({ message, status }) {
      throw new HttpException({ message, status }, status);
    }
  }

  async delete(id: number, userId: number): Promise<ApiResponse<null>> {
    const existingLike = await this.likesRepository.findOneBy({ id });

    if (!existingLike) {
      // TODO: exceptions
      throw new HttpException({ message: 'Nothing liked by such parameters' }, HttpStatus.BAD_REQUEST);
    }

    try {
      const response = await this.likesRepository.delete(id);
      return { message: 'Item disliked successfully' };
    } catch ({ message, status }) {
      throw new HttpException({ message, status }, status);
    }
  }
}
