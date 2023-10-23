import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { TimeService } from 'src/shared/services/time.service';
import { UsersService } from 'src/api/v1/users/users.service';

@Injectable()
export class ActivityCatcherMiddleware implements NestMiddleware {
  constructor(
    private usersService: UsersService,
    private timeService: TimeService
  ) {}

  async use(request: Request, response: Response, next: NextFunction) {
    const id = request.params.id || request.params.userId || request.body.userId;
    const updatedUser = await this.usersService.update(id, { lastTimeOnline: this.timeService.catchActivityTime() });
    
    next();
  }
}