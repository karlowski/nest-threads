import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { PostsModule } from './posts/posts.module';
import { UserPost } from './posts/post.entity';
import { CommentsModule } from './comments/comments.module';
import { UserComment } from './comments/comment.entity';
import { SharedModule } from './shared/shared.module';
import { LikesModule } from './likes/likes.module';
import { UserLike } from './likes/like.entity';
import { PostExistenceMiddleware } from './middlewares/post-existence.middleware';
import { UserExistenceMiddleware } from './middlewares/user-existence.middleware';
import { ActivityCatcherMiddleware } from './middlewares/activity-catcher.middleware';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.MYSQL_DB_HOST,
      port: Number(process.env.MYSQL_DB_PORT),
      username: process.env.MYSQL_DB_USERNAME,
      password: process.env.MYSQL_DB_PASSWORD,
      database: process.env.MYSQL_DB,
      entities: [User, UserPost, UserComment, UserLike],
      synchronize: false
    }),
    PostsModule,
    CommentsModule,
    SharedModule,
    LikesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(PostExistenceMiddleware)
      .forRoutes(
        { path: 'posts/:id', method: RequestMethod.DELETE },
        { path: 'comments', method: RequestMethod.POST },
        { path: 'comments/:id', method: RequestMethod.DELETE },
        'comments/postId/:postId',
        'likes'
      )
      .apply(UserExistenceMiddleware)
      .forRoutes(
        { path: 'posts', method: RequestMethod.POST },
        { path: 'posts/:id', method: RequestMethod.GET },
        { path: 'comments', method: RequestMethod.POST },
        { path: 'comments/:id', method: RequestMethod.DELETE },
        'comments/userId/:userId',
        'likes'
      )
      .apply(ActivityCatcherMiddleware)
      .forRoutes(
        { path: 'posts', method: RequestMethod.POST },
        { path: 'posts/:id', method: RequestMethod.PUT },
        { path: 'posts/:id', method: RequestMethod.DELETE },
        { path: 'comments', method: RequestMethod.POST },
        { path: 'comments/:id', method: RequestMethod.PUT },
        { path: 'comments/:id', method: RequestMethod.DELETE },
        { path: 'likes', method: RequestMethod.POST },
        // TODO:  'likes'
      );
  }
}
