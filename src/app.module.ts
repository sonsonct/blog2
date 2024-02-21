import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './components/auth/auth.module';
import { UsersModule } from './components/users/users.module';

import { PostsModule } from './components/posts/posts.module';
import { LoggerMiddleware } from './core/middlewere/loggeer.middlewere';
import { RolesModule } from './components/roles/roles.module';
import { CategoryModule } from './components/category/category.module';
import { CommentsModule } from './components/comments/comments.module';
import { NoticeModule } from './components/notice/notice.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { MediaModule } from './components/media/media.module';
import { HashtagModule } from './components/hashtag/hashtag.module';
import { FaqModule } from './components/faq/faq.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'mysql',
        host: process.env.DATABASE_HOST,
        port: +process.env.DATABASE_PORT,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        entities: ['dist/**/*/*.entity.js'],
        synchronize: true,
      }),
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    RolesModule,
    CategoryModule,
    CommentsModule,
    NoticeModule,
    CloudinaryModule,
    MediaModule,
    HashtagModule,
    FaqModule,
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
