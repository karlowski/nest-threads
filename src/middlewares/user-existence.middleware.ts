import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { UserNotFoundException } from 'src/exceptions/user-not-found.exception';
import { UsersService } from 'src/api/v1/users/users.service';

@Injectable()
export class UserExistenceMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id || request.params.userId || request.body.userId;
    const user = await this.usersService.getUserById(id);

    if (!user) throw new UserNotFoundException();

    next();
  }
}