import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { AuthService } from 'src/components/auth/auth.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [TypeOrmModule.forFeature([Users])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, CloudinaryService, JwtService]
})
export class UsersModule { }
