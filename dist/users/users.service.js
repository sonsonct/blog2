"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entitys/users.entity");
const typeorm_2 = require("typeorm");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getAllUsers() {
        const users = await this.usersRepository.find();
        return users;
    }
    async getById(id) {
        const users = await this.usersRepository.findOneBy({ id });
        if (users == null) {
            return {
                "error": "User not found",
            };
        }
        return users;
    }
    async deleteUser(id) {
        try {
            const users = await this.usersRepository.findOneBy({ id });
            if (users == null) {
                return {
                    "error": "User not found",
                };
            }
            else {
                await this.usersRepository.remove(users);
                return {
                    "sucess": "ok",
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateUser(id, dataUser) {
        try {
            const users = await this.usersRepository.findOneBy({ id });
            if (users == null) {
                return {
                    "error": "User not found",
                };
            }
            else {
                users.First_Name = dataUser.First_Name;
                users.Middle_Name = dataUser.Middle_Name;
                users.Last_Name = dataUser.Last_Name;
                users.Mobile = dataUser.Mobile;
                users.Email = dataUser.Email;
                users.Password_Hash = dataUser.Password_Hash;
                users.Intro = dataUser.Intro;
                users.Profile = dataUser.Profile;
                this.usersRepository.save(users);
                return {
                    "sucess": "ok",
                };
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async findRolesByUserId(id) {
        const user = await this.usersRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.role', 'role')
            .where('user.id = :id', { id })
            .getOne();
        if (user) {
            return user;
        }
        else {
            return [];
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
//# sourceMappingURL=users.service.js.map