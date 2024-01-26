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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Users = void 0;
const typeorm_1 = require("typeorm");
const Posts_entity_1 = require("./Posts.entity");
const Roles_entity_1 = require("./Roles.entity");
let Users = class Users {
};
exports.Users = Users;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "First_Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "Middle_Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "Last_Name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 20, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "Mobile", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 255, unique: true }),
    __metadata("design:type", String)
], Users.prototype, "Email", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Users.prototype, "Password_Hash", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Users.prototype, "Registered_At", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'timestamp' }),
    __metadata("design:type", Date)
], Users.prototype, "Last_Login", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], Users.prototype, "Intro", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], Users.prototype, "Profile", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: 3 }),
    __metadata("design:type", Number)
], Users.prototype, "role_id", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Posts_entity_1.Posts, (post) => post.user),
    __metadata("design:type", Array)
], Users.prototype, "post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roles_entity_1.Roles, role => role.user),
    (0, typeorm_1.JoinColumn)({ name: 'role_id' }),
    __metadata("design:type", Roles_entity_1.Roles)
], Users.prototype, "role", void 0);
exports.Users = Users = __decorate([
    (0, typeorm_1.Entity)('users')
], Users);
//# sourceMappingURL=users.entity.js.map