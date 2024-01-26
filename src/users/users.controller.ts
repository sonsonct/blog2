import { Body, Controller, Delete, Get, Param, Put, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { LoginDTO, RegisterDTO } from 'src/models/users.dto';

@Controller('users')
export class UsersController {
    constructor(private UsersService: UsersService) { }
    @Get()
    hello() {
        return 'Hello';
    }

    @Get("all")
    getAll() {
        return this.UsersService.getAllUsers();
    }
    @Get(":id")
    getById(@Param('id') id: number) {
        return this.UsersService.getById(id);
    }
    @Delete("/delete/:id")
    deleteUser(@Param('id') id: number) {
        return this.UsersService.deleteUser(id);
    }
    @Put("/update/:id")
    updateUser(@Param('id') id: number, @Body(ValidationPipe) dataUser: RegisterDTO) {
        return this.UsersService.updateUser(id, dataUser);
    }

    @Get("/getrole/:id")
    getRole(@Param('id') id: number) {
        return this.UsersService.findRolesByUserId(id);
    }


}
