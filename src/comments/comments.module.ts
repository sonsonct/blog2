import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Comments } from 'src/entitys/Comments.entity';
import { UsersService } from 'src/users/users.service';
import { Users } from 'src/entitys/users.entity';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Comments]), TypeOrmModule.forFeature([Users])],
  controllers: [CommentsController],
  providers: [CommentsService, UsersService, AuthService]
})
export class CommentsModule { }
