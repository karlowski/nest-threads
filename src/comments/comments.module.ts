import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { UserComment } from './comment.entity';
import { UserPost } from 'src/posts/post.entity';
import { SharedModule } from 'src/shared/shared.module';
import { User } from 'src/users/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, UserComment, UserPost]),
    SharedModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
