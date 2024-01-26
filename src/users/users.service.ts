import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entitys/users.entity';
import { LoginDTO, RegisterDTO } from 'src/models/users.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)
        private usersRepository: Repository<Users>

    ) { }
    async getAllUsers() {
        const users = await this.usersRepository.find();
        return users;
    }
    async getById(id: number) {
        const users = await this.usersRepository.findOneBy({ id });
        if (users == null) {
            return {
                "error": "User not found",
            }
        }
        return users;
    }
    async deleteUser(id: number) {
        try {
            const users = await this.usersRepository.findOneBy({ id });
            if (users == null) {
                return {
                    "error": "User not found",
                }
            } else {
                await this.usersRepository.remove(users);
                return {
                    "sucess": "ok",
                }
            }

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
            } else {
                users.First_Name = dataUser.First_Name;
                users.Middle_Name = dataUser.Middle_Name;
                users.Last_Name = dataUser.Last_Name;
                users.Mobile = dataUser.Mobile;
                users.Email = dataUser.Email;
                users.Password_Hash = dataUser.Password_Hash;
                users.Intro = dataUser.Intro;
                users.Profile = dataUser.Profile;
                this.usersRepository.save(users)
                return {
                    "sucess": "ok",
                }
            }

        } catch (error) {
            console.log(error);
        }

    }

    async findRolesByUserId(id: number) {
        const user = await this.usersRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.id = :id', { id })
            .getOne();

        if (user) {
            return user;
        } else {
            return [];
        }
    }
}
