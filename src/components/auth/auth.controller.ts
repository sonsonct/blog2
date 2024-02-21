import { Body, Controller, Get, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/entities/users.entity';
import { ApiTags } from '@nestjs/swagger';
import { LoginDTO } from './dto/request/login.dto';
import { RegisterDTO } from './dto/request/register.dto';
import { TokenDTO } from './dto/request/token.dto';

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
