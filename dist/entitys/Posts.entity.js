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
exports.Posts = void 0;
const typeorm_1 = require("typeorm");
const users_entity_1 = require("./users.entity");
let Posts = class Posts {
    setPublishedAt() {
        if (this.Published) {
            this.Published_At = new Date();
        }
        else {
            this.Published_At = null;
        }
    }
    updatePublishedAt() {
        if (this.Published == true) {
            this.Published_At = new Date();
        }
        if (this.Published == false) {
            this.Published_At = null;
        }
        this.Updated_At = new Date();
    }
};
exports.Posts = Posts;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Posts.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Number)
], Posts.prototype, "Author_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: null }),
    __metadata("design:type", Number)
], Posts.prototype, "Parent_Id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Posts.prototype, "Title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Posts.prototype, "Meta_Title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'varchar', length: 255 }),
    __metadata("design:type", String)
], Posts.prototype, "Slug", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, type: 'text' }),
    __metadata("design:type", String)
], Posts.prototype, "Summary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", Boolean)
], Posts.prototype, "Published", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({ type: 'datetime', nullable: false }),
    __metadata("design:type", Date)
], Posts.prototype, "Created_At", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Posts.prototype, "Updated_At", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'datetime', nullable: true }),
    __metadata("design:type", Date)
], Posts.prototype, "Published_At", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'text', nullable: true }),
    __metadata("design:type", String)
], Posts.prototype, "Content", void 0);
__decorate([
    (0, typeorm_1.AfterInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Posts.prototype, "setPublishedAt", null);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Posts.prototype, "updatePublishedAt", null);
__decorate([
    (0, typeorm_1.ManyToOne)(() => users_entity_1.Users, user => user.post),
    (0, typeorm_1.JoinColumn)({ name: 'Author_Id' }),
    __metadata("design:type", users_entity_1.Users)
], Posts.prototype, "user", void 0);
exports.Posts = Posts = __decorate([
    (0, typeorm_1.Entity)('posts')
], Posts);
//# sourceMappingURL=Posts.entity.js.map