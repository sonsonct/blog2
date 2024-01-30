import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, Query, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO, RegisterDTO } from 'src/models/users.dto';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService) { }
    @Get("all")
    getAll() {
        return this.UsersService.getAllUsers();
    }
    @Get()
    getById(
        @Query('id', new ParseIntPipe()) id: number,
    ) {
        return this.UsersService.getById(id);
    }
    @Delete("/delete")
    deleteUser(
        @Query('id', new ParseIntPipe()) id: number,
    ) {
        return this.UsersService.deleteUser(id);
    }
    @Put("/update")
    updateUser(
        @Query('id', new ParseIntPipe()) id: number,
        @Body(ValidationPipe) dataUser: RegisterDTO
    ) {
        return this.UsersService.updateUser(id, dataUser);
    }
    @Get("/getrole")
    getRole(
        @Query('id', new ParseIntPipe()) id: number,
    ) {
        return this.UsersService.findRolesByUserId(id);
    }
}
