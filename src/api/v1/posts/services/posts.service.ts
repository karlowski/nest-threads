import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostEntity } from '../entities/post.entity';
import { CreatePostDto } from 'src/api/v1/posts/dto/create-post.dto';
import { TimeService } from 'src/shared/services/time.service';
import { EntitiesNotFoundException } from 'src/exceptions/entities-not-found.exception';
import { PostNotFoundException } from 'src/exceptions/post-not-found.exception';
import { ApiResponse } from 'src/interfaces/api-response.interface';
import { UserPost } from 'src/api/v1/posts/interfaces/post.interface';

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
  constructor(
    @InjectRepository(PostEntity)
    private postsRepository: Repository<PostEntity>,
    private timeService: TimeService
  ) {}

  async getPostById(id: number): Promise<UserPost> {
    return this.postsRepository.findOneBy({ id });
  }

  async getAll(): Promise<UserPost[]> {
    const userPosts = this.postsRepository.find({
      relations: {
        comments: true,
        likes: true
      }
    });

    if (!userPosts) throw new EntitiesNotFoundException();
    
    return userPosts;
  }

  async getAllFromUser(userId: number): Promise<UserPost[]> {


    const userPosts = this.postsRepository.find({
      where: { userId },
      relations: {
        comments: true,
        likes: true
      }
    });

    if (!userPosts) throw new EntitiesNotFoundException();
    
    return userPosts;
  }

  async create(post: CreatePostDto): Promise<ApiResponse<UserPost>> {
    try {
      const newPostData = await this.postsRepository.create({ ...post, creationTime: this.timeService.catchActivityTime() });
      const createdPost = await this.postsRepository.save(newPostData);
      return { message: 'Message posted', data: createdPost };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: number): Promise<ApiResponse<UserPost>> {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) throw new PostNotFoundException();

    try {
      await this.postsRepository.delete(id);
      return { message: 'Post removed', data: post };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
