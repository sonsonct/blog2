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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const users_entity_1 = require("../entitys/users.entity");
const typeorm_2 = require("typeorm");
const jwt_1 = require("@nestjs/jwt");
const constants_1 = require("./constants");
const bcrypt = require("bcrypt");
let AuthService = class AuthService {
    constructor(usersRepository, jwtService) {
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
    }
    async findAll() {
        return this.usersRepository.find();
    }
    async login({ Email, Password_Hash }) {
        try {
            const user = await this.usersRepository.findOne({ where: { Email } });
            if (user == null) {
                throw new common_1.UnauthorizedException('user not found');
            }
            if (await this.comparePassword(Password_Hash, user.Password_Hash) == false) {
                throw new common_1.UnauthorizedException('login failed');
            }
            const payload = { sub: user.id };
            return {
                access_token: await this.jwtService.signAsync(payload),
            };
        }
        catch (err) {
            console.log(err);
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
    }
    async register(credentials) {
        try {
            const hashedPassword = await this.hashPassword(credentials.Password_Hash);
            const user = this.usersRepository.create(credentials);
            user.Password_Hash = hashedPassword;
            await this.usersRepository.save(user);
            return user;
        }
        catch (err) {
            console.log(err);
            throw new common_1.UnauthorizedException(err);
        }
    }
    async hashPassword(password) {
        return bcrypt.hash(password, 10);
    }
    async comparePassword(password, Password_Hash) {
        return bcrypt.compare(password, Password_Hash);
    }
    async verifyToken(token) {
        try {
            console.log(token.token);
            console.log(constants_1.jwtConstants.secret);
            const payload = await this.jwtService.verifyAsync(token.token, {
                secret: constants_1.jwtConstants.secret
            });
            console.log(payload);
            return payload;
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(users_entity_1.Users)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map