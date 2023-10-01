import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserComment } from './comment.entity';
import { CreateCommentDto } from 'src/dto/create-comment-dto';
import { UserPost } from 'src/posts/post.entity';
import { TimeService } from 'src/shared/services/time.service';
import { EntitiesNotFoundException } from 'src/exceptions/entities-not-found.exception';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(UserComment)
    private commentsRepository: Repository<UserComment>,
    @InjectRepository(UserPost)
    private postsRepository: Repository<UserPost>,
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

  async create(commentData: CreateCommentDto): Promise<any> {
    try {
      const createdComment = await this.commentsRepository.create({ ...commentData, creationTime: this.timeService.catchActivityTime() });
      const savedComment = await this.commentsRepository.save(createdComment);
      return { message: 'Comment posted', comment: savedComment };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      await this.commentsRepository.delete(id);
      return { message: 'Comment successfully deleted' };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
