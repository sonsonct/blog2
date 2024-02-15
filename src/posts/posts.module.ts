import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entitys/Posts.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/entitys/users.entity';
import { AuthService } from 'src/auth/auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { MediaService } from 'src/media/media.service';
import { Media } from 'src/entitys/Media.entity';
import { PostsHashtag } from 'src/entitys/PostsHashtag.entity';
import { HashtagService } from 'src/hashtag/hashtag.service';
import { Hashtag } from 'src/entitys/Hashtag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), TypeOrmModule.forFeature([Users]), TypeOrmModule.forFeature([Media]), TypeOrmModule.forFeature([PostsHashtag]), TypeOrmModule.forFeature([Hashtag])],
  controllers: [PostsController],
  providers: [PostsService, UsersService, AuthService, CloudinaryService, MediaService, HashtagService]
})
export class PostsModule { }
