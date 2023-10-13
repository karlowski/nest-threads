import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { UserEntity } from './users/user.entity';
import { PostsModule } from './posts/posts.module';
import { PostEntity } from './posts/post.entity';
import { CommentsModule } from './comments/comments.module';
import { CommentEntity } from './comments/comment.entity';
import { SharedModule } from './shared/shared.module';
import { LikesModule } from './likes/likes.module';
import { LikeEntity } from './likes/like.entity';
import { PostExistenceMiddleware } from './middlewares/post-existence.middleware';
import { UserExistenceMiddleware } from './middlewares/user-existence.middleware';
import { ActivityCatcherMiddleware } from './middlewares/activity-catcher.middleware';
import { JwtModule } from '@nestjs/jwt';

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
