import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [TypeOrmModule.forFeature([Users]),
  JwtModule.registerAsync({
    useFactory: () => {
      return {
        secret: process.env.JWT_SECRET,
        signOptions: { expiresIn: '1d' },
      };
    },
  }),
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule { }
