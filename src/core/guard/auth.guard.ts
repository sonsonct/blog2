import { UsersService } from '../../components/users/users.service';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: process.env.JWT_SECRET
                }
            );

            request['user'] = payload;

            const user = await this.usersService.findRolesByUserId(payload.sub);

            if (user['role'].nameRole == "admin") {
                return true;
            } else {
                throw new UnauthorizedException("role no admin");
            }
        } catch {
            throw new UnauthorizedException("not authorized");
        }

    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}
