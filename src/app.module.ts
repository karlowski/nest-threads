import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
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
      envFilePath: '.env',
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_DB_HOST'),
        port: configService.getOrThrow('MYSQL_DB_PORT'),
        username: configService.getOrThrow('MYSQL_DB_USERNAME'),
        password: configService.getOrThrow('MYSQL_DB_PASSWORD'),
        database: configService.getOrThrow('MYSQL_DB'),
        entities: [UserEntity, PostEntity, CommentEntity, LikeEntity],
        synchronize: configService.getOrThrow('SYNCRONIZE_DB') === 'true'
      }),
      inject: [ConfigService]
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
        { path: 'posts/:id', method: RequestMethod.DELETE, version: ['1'] },
        { path: 'comments', method: RequestMethod.POST, version: ['1'] },
        // { path: 'comments/:id', method: RequestMethod.DELETE, version: ['1'] },
        { path: 'comments/postId/:postId', method: RequestMethod.GET, version: ['1'] },
        { path: 'likes', method: RequestMethod.POST, version: ['1'] },
        { path: 'likes', method: RequestMethod.DELETE, version: ['1'] }
      )
      .apply(UserExistenceMiddleware)
      .forRoutes(
        { path: 'posts', method: RequestMethod.POST, version: ['1'] },
        { path: 'posts/:id', method: RequestMethod.GET, version: ['1'] },
        { path: 'comments', method: RequestMethod.POST, version: ['1'] },
        // { path: 'comments/:id', method: RequestMethod.DELETE, version: ['1'] },
        { path: 'comments/postId/:postId', method: RequestMethod.GET, version: ['1'] },
        { path: 'likes', method: RequestMethod.POST, version: ['1'] },
        { path: 'likes', method: RequestMethod.DELETE, version: ['1'] }
      )
      .apply(ActivityCatcherMiddleware)
      .forRoutes(
        // { path: 'auth/sign-in', method: RequestMethod.POST },
        { path: 'posts', method: RequestMethod.POST, version: ['1'] },
        { path: 'posts/:id', method: RequestMethod.PUT, version: ['1'] },
        { path: 'posts/:id', method: RequestMethod.DELETE, version: ['1'] },
        { path: 'comments', method: RequestMethod.POST, version: ['1'] },
        { path: 'comments/:id', method: RequestMethod.PUT, version: ['1'] },
        // { path: 'comments/:id', method: RequestMethod.DELETE, version: ['1'] },
        { path: 'likes', method: RequestMethod.POST, version: ['1'] },
        { path: 'likes', method: RequestMethod.DELETE, version: ['1'] }
        
      );
  }
}
