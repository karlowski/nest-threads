import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPost } from './post.entity';
import { CreatePostDto } from 'src/dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(UserPost)
    private postsRepository: Repository<UserPost>,
    @InjectRepository(UserPost)
    private likessRepository: Repository<UserPost>
  ) {}

  async getAll(): Promise<UserPost[]> {
    return this.postsRepository.find({
      select: ['id', 'userId', 'postMessage'],
    })
  }

  async getAllFromUser(userId: number): Promise<UserPost[]> {
    return this.postsRepository.find({
      select: ['id', 'userId', 'postMessage'],
      where: { userId }
    });
  }

  async create(post: CreatePostDto): Promise<UserPost> {
    try {
      const newPostData = await this.postsRepository.create(post);
      const createdPost = await this.postsRepository.save(newPostData);
      return createdPost;
    } catch ({ response, message, status }) {
      throw new HttpException({ message, status }, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllWithLikes(): Promise<any> {
    return this
  }
}
