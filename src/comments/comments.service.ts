import { HttpException, Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { UserComment } from './comment.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCommentDto } from 'src/dto/create-comment-dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(UserComment)
    private commentsRepository: Repository<UserComment>,
    @InjectDataSource()
    private dataSource: DataSource
  ) {}

  async getAllFromUser(userId: number): Promise<UserComment[]> {
    return this.commentsRepository.findBy({ userId });
  }

  async getAllForPost(postId: number): Promise<UserComment[]> {
    return this.commentsRepository.findBy({ postId });
  }

  async create(commentData: CreateCommentDto): Promise<any> {
    try {
      const newComment = await this.commentsRepository.insert({ ...commentData, creationTime: this.catchActivityTime() });
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

  private catchActivityTime(): string {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
