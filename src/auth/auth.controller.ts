import { Body, Controller, Get, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/entitys/users.entity';
import { LoginDTO, RegisterDTO, TokenDTO } from 'src/models/users.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("auth")
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) { };
    @Get()
    getAll(): Promise<Users[]> {
        return this.authService.findAll();
    }

    @HttpCode(HttpStatus.OK)
    @Post("/login")
    login(@Body(ValidationPipe) credentials: LoginDTO) {
        return this.authService.login(credentials);
    }
    @HttpCode(HttpStatus.OK)
    @Post("/register")
    register(@Body(ValidationPipe) credentials: RegisterDTO) {
        return this.authService.register(credentials);
    }

    @HttpCode(HttpStatus.OK)
    @Post("/verify")
    verifyToken(@Body(ValidationPipe) token: TokenDTO) {
        return this.authService.verifyToken(token);
    }
}
