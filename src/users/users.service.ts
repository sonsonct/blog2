import { AuthService } from './../auth/auth.service';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entitys/users.entity';
import { RegisterDTO } from 'src/models/users.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>,
        private AuthService: AuthService
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
    async updateUser(id: number, dataUser: RegisterDTO) {
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
            users.mobile = dataUser.mobile;
            users.email = dataUser.email;
            users.passwordHash = passwordHash;
            users.intro = dataUser.intro;
            users.profile = dataUser.profile;
            users.roleId = dataUser.roleId;
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
}
