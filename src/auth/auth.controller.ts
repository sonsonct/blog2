import { Body, Controller, Get, HttpCode, HttpStatus, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Users } from 'src/entitys/users.entity';
import { LoginDTO } from 'src/models/users.dto';

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
    register(@Body(ValidationPipe) credentials: LoginDTO) {
        return this.authService.register(credentials);
    }


    @HttpCode(HttpStatus.OK)
    @Post("/verify")
    verifyToken(@Body() token: string) {
        return this.authService.verifyToken(token);
    }
}
