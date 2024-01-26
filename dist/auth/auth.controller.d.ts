import { AuthService } from './auth.service';
import { Users } from 'src/entitys/users.entity';
import { LoginDTO } from 'src/models/users.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    getAll(): Promise<Users[]>;
    login(credentials: LoginDTO): Promise<{
        access_token: string;
    }>;
    register(credentials: LoginDTO): Promise<Users>;
    verifyToken(token: string): Promise<any>;
}
