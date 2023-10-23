import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/v1/users/users.module';
import { AuthModule } from './api/v1/auth/auth.module';
import { UserEntity } from './api/v1/users/entities/user.entity';
import { PostsModule } from './api/v1/posts/posts.module';
import { PostEntity } from './api/v1/posts/entities/post.entity';
import { CommentsModule } from './api/v1/comments/comments.module';
import { CommentEntity } from './api/v1/comments/entities/comment.entity';
import { SharedModule } from './shared/shared.module';
import { LikesModule } from './api/v1/likes/likes.module';
import { LikeEntity } from './api/v1/likes/entities/like.entity';
import { PostExistenceMiddleware } from './middlewares/post-existence.middleware';
import { UserExistenceMiddleware } from './middlewares/user-existence.middleware';
import { ActivityCatcherMiddleware } from './middlewares/activity-catcher.middleware';

@Module({
  imports: [
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
      entities: [UserEntity, PostEntity, CommentEntity, LikeEntity],
      synchronize: false
    }),
    JwtModule.register({
      global: true,
      secret: process.env.TOKEN_SECRET,
      signOptions: { expiresIn: '5m' }
    }),
    SharedModule,
    AuthModule,
    UsersModule,
    PostsModule,
    CommentsModule,
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
        // { path: 'auth/sign-in', method: RequestMethod.POST },
        { path: 'posts', method: RequestMethod.POST },
        { path: 'posts/:id', method: RequestMethod.PUT },
        { path: 'posts/:id', method: RequestMethod.DELETE },
        { path: 'comments', method: RequestMethod.POST },
        { path: 'comments/:id', method: RequestMethod.PUT },
        { path: 'comments/:id', method: RequestMethod.DELETE },
        'likes'
      );
  }
}
