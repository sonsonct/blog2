import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/entitys/Posts.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/entitys/users.entity';
import { AuthService } from 'src/auth/auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Posts]), TypeOrmModule.forFeature([Users])],
  controllers: [PostsController],
  providers: [PostsService, UsersService, AuthService, CloudinaryService]
})
export class PostsModule { }
