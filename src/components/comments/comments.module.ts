import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/entities/comments.entity';
import { UsersService } from 'src/components/users/users.service';
import { Users } from 'src/entities/users.entity';
import { AuthService } from 'src/components/auth/auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), TypeOrmModule.forFeature([Users])],
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, AuthService, CloudinaryService, JwtService]
})
export class CommentsModule { }
