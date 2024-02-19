import { AuthService } from '../auth/auth.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/users.entity';
import { Repository } from 'typeorm';
import { UpdateUserDTO } from './dto/request/update-user.dto';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private AuthService: AuthService,

        private cloudinary: CloudinaryService,
    ) { }
    async getAllUsers() {
        try {
            return await this.usersRepository.find();
        } catch (error) {
            console.log(error);
        }

    }
    async getById(id: number) {
        try {
            return await this.usersRepository.findOneBy({ id });
        } catch (error) {
            console.log(error);
        }

    }
    async deleteUser(id: number) {
        try {
            const users = await this.usersRepository.findOneBy({ id });

            if (users == null) {
                return {
                    "error": "User not found",
                }
            }

            return await this.usersRepository.remove(users);
        } catch (error) {
            console.log(error);
        }
    }
    async updateUser(id: number, dataUser: UpdateUserDTO) {
        try {
            const users = await this.usersRepository.findOneBy({ id });

            if (users == null) {
                return {
                    "error": "User not found",
                }
            }

            const passwordHash = await this.AuthService.hashPassword(dataUser.passwordHash);

            users.firstName = dataUser.firstName;
            users.middleName = dataUser.middleName;
            users.lastName = dataUser.lastName;
            users.passwordHash = passwordHash;
            users.intro = dataUser.intro;
            users.profile = dataUser.profile;
            users.roleId = dataUser.roleId;
            users.avataUser = dataUser.avataUser;

            return await this.usersRepository.save(users)

        } catch (error) {
            console.log(error);
        }

    }
    async findRolesByUserId(id: number) {
        try {
            return await this.usersRepository.createQueryBuilder('user')
                .leftJoinAndSelect('user.role', 'role')
                .where('user.id = :id', { id })
                .getOne();

        } catch (error) {
            console.log(error);
        }
    }

    async uploadFileToCloudinary(file: Express.Multer.File) {
        return await this.cloudinary.uploadFile(file).catch(() => {
            throw new BadRequestException('Invalid file type.');
        });
    }
}
