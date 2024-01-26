import { Users } from 'src/entitys/users.entity';
import { LoginDTO } from 'src/models/users.dto';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private usersRepository;
    private jwtService;
    constructor(usersRepository: Repository<Users>, jwtService: JwtService);
    findAll(): Promise<Users[]>;
    login({ Email, Password_Hash }: LoginDTO): Promise<{
        access_token: string;
    }>;
    register(credentials: LoginDTO): Promise<Users>;
    hashPassword(password: string): Promise<string>;
    comparePassword(password: string, Password_Hash: string): Promise<boolean>;
    verifyToken(token: any): Promise<any>;
}
