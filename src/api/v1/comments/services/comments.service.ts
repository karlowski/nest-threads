import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CommentEntity } from '../entities/comment.entity';
import { CreateCommentDto } from 'src/api/v1/comments/dto/create-comment-dto';
import { TimeService } from 'src/shared/services/time.service';
import { EntitiesNotFoundException } from 'src/exceptions/entities-not-found.exception';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { UserComment } from 'src/api/v1/comments/interfaces/comment.interface';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentEntity)
    private commentsRepository: Repository<CommentEntity>,
    private timeService: TimeService
  ) {}

  async getAllFromUser(userId: number): Promise<UserComment[]> {
    const userComments = await this.commentsRepository.find({
      where: { userId },
      relations: {
        likes: true
      }
    });

    if (!userComments) throw new EntitiesNotFoundException();

    return userComments;
  }

  async getAllForPost(postId: number): Promise<UserComment[]> {
    const postComments = await this.commentsRepository.find({
      where: { postId },
      relations: {
        likes: true
      }
    });

    if (!postComments) throw new EntitiesNotFoundException();

    return postComments;
  }

  async create(commentData: CreateCommentDto): Promise<ApiResponse<UserComment>> {
    try {
      const createdComment = await this.commentsRepository.create({ ...commentData, creationTime: this.timeService.catchActivityTime() });
      await createdComment.save();
      return { message: 'Comment posted', data: createdComment };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: number): Promise<ApiResponse<null>> {
    try {
      await this.commentsRepository.delete(id);
      return { message: 'Comment successfully deleted' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
