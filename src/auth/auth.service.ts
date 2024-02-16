import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entitys/users.entity';
import { LoginDTO, RegisterDTO, TokenDTO } from 'src/models/users.dto';
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
        return await this.usersRepository.find();
    }
    async login({ email, passwordHash }: LoginDTO) {
        try {
            const user = await this.usersRepository.findOne({ where: { email } });

            if (user == null) {
                throw new UnauthorizedException('user not found');
            }

            const check = await this.comparePassword(passwordHash, user.passwordHash);

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
    async register(credentials: RegisterDTO) {
        try {
            const email = credentials.email;

            const checkEmail = await this.usersRepository.findOne({ where: { email } });

            if (checkEmail != null) {
                throw new UnauthorizedException('Email already exists');
            }

            const mobile = credentials.mobile;

            const checkMobile = await this.usersRepository.findOne({ where: { mobile } });

            if (checkMobile != null) {
                throw new UnauthorizedException('Mobile already exists');
            }

            const hashedPassword = await this.hashPassword(credentials.passwordHash);

            const user = this.usersRepository.create(credentials);

            user.passwordHash = hashedPassword;

            return await this.usersRepository.save(user);
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
    async verifyToken(token: TokenDTO) {
        try {
            const payload = await this.jwtService.verifyAsync(
                token.token,
                {
                    secret: jwtConstants.secret
                }
            );

            return payload;
        } catch (error) {
            console.log(error);
        }
    }
}
