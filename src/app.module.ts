import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

import { PostsModule } from './posts/posts.module';
import { LoggerMiddleware } from './middlewere/loggeer.middlewere';
import { RolesModule } from './roles/roles.module';
import { CategoryModule } from './category/category.module';
import { CommentsModule } from './comments/comments.module';
import { NoticeModule } from './notice/notice.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'blog',
      entities: ['dist/**/*/*.entity.js'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    RolesModule,
    CategoryModule,
    CommentsModule,
    NoticeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '/posts/**', method: RequestMethod.GET });
  }
}
