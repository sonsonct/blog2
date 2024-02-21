import { Body, Controller, Delete, Get, Param, ParseIntPipe, Put, Query, UploadedFile, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiTags } from '@nestjs/swagger';
import { UpdateUserDTO } from './dto/request/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags("users")
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
    @UseInterceptors(FileInterceptor('file'))
    async updateUser(
        @Query('id', new ParseIntPipe()) id: number,
        @Body() dataUser: UpdateUserDTO,
        @UploadedFile() file: Express.Multer.File
    ) {

        if (file != null) {
            if (file.size > 1024 * 1024 * 10) {
                return {
                    "message": `File ${file.originalname} size > 10MB`
                };
            }

            const avata = await this.UsersService.uploadFileToCloudinary(file);

            dataUser.avataUser = avata["secure_url"];
        }

        return this.UsersService.updateUser(id, dataUser);
    }
    @Get("/getRole")
    getRole(
        @Query('id', new ParseIntPipe()) id: number,
    ) {
        return this.UsersService.findRolesByUserId(id);
    }
}
