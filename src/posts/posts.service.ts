import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserPost } from './post.entity';
import { CreatePostDto } from 'src/dto/create-post.dto';
import { TimeService } from 'src/shared/services/time.service';
import { EntitiesNotFoundException } from 'src/exceptions/entities-not-found.exception';
import { PostNotFoundException } from 'src/exceptions/post-not-found.exception';

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
  constructor(
    @InjectRepository(UserPost)
    private postsRepository: Repository<UserPost>,
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

  async create(post: CreatePostDto): Promise<Record<string, string | UserPost>> {
    try {
      const newPostData = await this.postsRepository.create({ ...post, creationTime: this.timeService.catchActivityTime() });
      const createdPost = await this.postsRepository.save(newPostData);
      return { message: 'Message posted', post: createdPost };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async delete(id: number): Promise<Record<string, string | UserPost>> {
    const post = await this.postsRepository.findOneBy({ id });

    if (!post) throw new PostNotFoundException();

    try {
      await this.postsRepository.delete(id);
      return { message: 'Post removed', post }
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
