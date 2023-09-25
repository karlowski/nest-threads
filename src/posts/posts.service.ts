import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPost } from './post.entity';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { UserComment } from 'src/comments/comment.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(UserPost)
    private postsRepository: Repository<UserPost>,
    @InjectRepository(UserComment)
    private commentsRepository: Repository<UserComment>
  ) {}

  async getAll(): Promise<UserPost[]> {
    return this.postsRepository.find({
      relations: {
        comments: true
      }
    });
  }

  async getAllFromUser(userId: number): Promise<UserPost[]> {
    return this.postsRepository.find({
      where: { userId },
      relations: {
        comments: true
      }
    });
  }

  async create(post: CreatePostDto): Promise<UserPost> {
    try {
      const newPostData = await this.postsRepository.create({ ...post, creationTime: this.catchActivityTime() });
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

  private catchActivityTime(): string {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  }
}
