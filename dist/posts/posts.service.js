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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const Posts_entity_1 = require("../entitys/Posts.entity");
const typeorm_2 = require("typeorm");
let PostsService = class PostsService {
    constructor(postRepository) {
        this.postRepository = postRepository;
    }
    async getAll() {
        return await this.postRepository.find();
    }
    async createPost(postData) {
        const post = this.postRepository.create(postData);
        await this.postRepository.save(post);
        return post;
    }
    async updatePost(id, postData) {
        const post = await this.postRepository.findOneBy({ id });
        if (post == null) {
            return {
                "error": "post not found",
            };
        }
        else {
            post.Title = postData.Title;
            post.Meta_Title = postData.Meta_Title;
            post.Slug = postData.Slug;
            post.Summary = postData.Summary;
            post.Published = postData.Published;
            post.Content = postData.Content;
            this.postRepository.save(post);
            return {
                "success": "updated successfully",
            };
        }
    }
    async deletePost(id) {
        const post = await this.postRepository.findOneBy({ id });
        if (post == null) {
            return {
                "error": "post not found",
            };
        }
        else {
            this.postRepository.remove(post);
            return {
                "success": "delete successfully",
            };
        }
    }
    async findUserByPostId(id) {
        const data = await this.postRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .where('post.id = :id', { id })
            .getOne();
        if (data == null) {
            return {
                "error": "post not found",
            };
        }
        else {
            return data;
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(Posts_entity_1.Posts)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PostsService);
//# sourceMappingURL=posts.service.js.map