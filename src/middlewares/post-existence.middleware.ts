import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { PostNotFoundException } from 'src/exceptions/post-not-found.exception';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class PostExistenceMiddleware implements NestMiddleware {
  constructor(private postsService: PostsService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id || request.params.postId || request.body.postId;
    const post = await this.postsService.getPostById(id);

    if (!post) throw new PostNotFoundException();

    next();
  }
}
