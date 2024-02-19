import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entities/posts.entity';
import { UsersService } from 'src/components/users/users.service';
import { Users } from 'src/entities/users.entity';
import { AuthService } from 'src/components/auth/auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MediaService } from 'src/components/media/media.service';
import { Media } from 'src/entities/media.entity';
import { PostsHashtag } from 'src/entities/postsHashtag.entity';
import { HashtagService } from 'src/components/hashtag/hashtag.service';
import { Hashtag } from 'src/entities/hashtag.entity';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), TypeOrmModule.forFeature([Users]), TypeOrmModule.forFeature([Media]), TypeOrmModule.forFeature([PostsHashtag]), TypeOrmModule.forFeature([Hashtag])],
  controllers: [PostsController],
  providers: [PostsService, UsersService, AuthService, CloudinaryService, MediaService, HashtagService, JwtService]
})
export class PostsModule { }
