import { CommentsService } from '../comments/comments.service';
import { UsersService } from '../users/users.service';
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';
import { Request } from 'express';

@Injectable()
export class CheckAuthorGuard implements CanActivate {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private commentsService: CommentsService
    ) { }
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();

        const paramId = request.params.id;

        const token = this.extractTokenFromHeader(request);

        if (!token) {
            throw new UnauthorizedException();
        }

        try {
            const payload = await this.jwtService.verifyAsync(
                token,
                {
                    secret: jwtConstants.secret
                }
            );

            request['user'] = payload;

            const user = await this.usersService.findRolesByUserId(payload.sub);

            const Comment = await this.commentsService.findById(paramId);

            if (user.id == Comment.authorId) {
                return true;
            } else {
                throw new UnauthorizedException("you not author");
            }
        } catch {
            throw new UnauthorizedException();
        }

    }
    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];

        return type === 'Bearer' ? token : undefined;
    }
}