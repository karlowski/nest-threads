import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPost } from './post.entity';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { UserComment } from 'src/comments/comment.entity';
import { TimeService } from 'src/shared/services/time.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(UserPost)
    private postsRepository: Repository<UserPost>,
    @InjectRepository(UserComment)
    private commentsRepository: Repository<UserComment>,
    private timeService: TimeService
  ) {}

  async getAll(): Promise<UserPost[]> {
    return this.postsRepository.find({
      relations: {
        comments: true,
        likes: true
      }
    });
  }

  async getAllFromUser(userId: number): Promise<UserPost[]> {
    return this.postsRepository.find({
      where: { userId },
      relations: {
        comments: true,
        likes: true
      }
    });
  }

  async create(post: CreatePostDto): Promise<UserPost> {
    try {
      const newPostData = await this.postsRepository.create({ ...post, creationTime: this.timeService.catchActivityTime() });
      const createdPost = await this.postsRepository.save(newPostData);
      return createdPost;
    } catch ({ response, message, status }) {
      throw new HttpException({ message, status }, HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      return await this.postsRepository.delete(id);
    } catch ({ message, status }) {
      throw new HttpException({ message, status }, status);
    }
  }

  // async getAllWithLikes(): Promise<any> {
  //   return this
  // }
}
