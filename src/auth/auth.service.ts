import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entitys/users.entity';
import { LoginDTO } from 'src/models/users.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private jwtService: JwtService
    ) { }
    async findAll(): Promise<Users[]> {
        return this.usersRepository.find();
    }

    async login({ Email, Password_Hash }: LoginDTO) {
        try {
            const user = await this.usersRepository.findOne({ where: { Email } });
            if (user == null) {
                throw new UnauthorizedException('user not found');
            }
            // console.log(Password_Hash);
            const check = await this.comparePassword(Password_Hash, user.Password_Hash);
            if (check == false) {
                throw new UnauthorizedException('login failed');

            }

            const payload = { sub: user.id };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        } catch (err) {
            console.log(err);
            throw new UnauthorizedException('Invalid credentials');
        }
    }

    async register(credentials: LoginDTO) {
        try {
            const hashedPassword = await this.hashPassword(credentials.Password_Hash);
            const user = this.usersRepository.create(credentials);
            user.Password_Hash = hashedPassword;
            await this.usersRepository.save(user);
            return user;
        } catch (err) {
            console.log(err);
            throw new UnauthorizedException(err);
        }
    }

    async hashPassword(password: string) {
        return bcrypt.hash(password, 10);
    }
    async comparePassword(password: string, Password_Hash: string) {
        return bcrypt.compare(password, Password_Hash)
    }
    async verifyToken(token: any) {
        try {
            console.log(token.token);
            console.log(jwtConstants.secret);
            const payload = await this.jwtService.verifyAsync(
                token.token,
                {
                    secret: jwtConstants.secret
                }
            );
            console.log(payload);
            return payload;
        } catch (error) {
            console.log(error);
        }
    }
}
