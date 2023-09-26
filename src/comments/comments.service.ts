import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';

import { UserComment } from './comment.entity';
import { CreateCommentDto } from 'src/dto/create-comment-dto';
import { UserPost } from 'src/posts/post.entity';
import { TimeService } from 'src/shared/services/time.service';

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
    return this.commentsRepository.find({
      where: { userId },
      relations: {
        likes: true
      }
    });
  }

  async getAllForPost(postId: number): Promise<UserComment[]> {
    return this.commentsRepository.find({
      where: { postId },
      relations: {
        likes: true
      }
    });
  }

  async create(commentData: CreateCommentDto): Promise<any> {
    const postToComment = await this.postsRepository.findOneBy({ id: commentData.postId });

    if (!postToComment) {
      throw new HttpException({ message: 'No such post to comment on', status: HttpStatus.BAD_REQUEST }, HttpStatus.BAD_REQUEST);
    } 

    try {
      const newComment = await this.commentsRepository.insert({ ...commentData, creationTime: this.timeService.catchActivityTime() });
      return { message: 'Comment posted' };
    } catch ({ message, status }) {
      throw new HttpException({ message, status }, status);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      await this.commentsRepository.delete(id);
      return { message: 'Comment successfully deleted' };
    } catch ({ message, status }) {
      throw new HttpException({ message, status }, status);
    }
  }
}
