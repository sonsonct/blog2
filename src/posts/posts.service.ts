import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Posts } from 'src/entitys/Posts.entity';
import { PostDTO } from 'src/models/posts.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postRepository: Repository<Posts>,
        private cloudinary: CloudinaryService,
    ) { }
    async getAll() {
        try {
            return await this.postRepository.find();
        } catch (error) {
            console.log(error);
        }

    }
    async createPost(postData: PostDTO) {
        try {
            const data = JSON.parse(JSON.stringify(postData));
            return await this.postRepository.save(data);
        } catch (error) {
            console.log(error);
        }

    }
    async updatePost(id: number, postData: PostDTO) {
        try {
            const post = await this.postRepository.findOneBy({ id });
            if (post == null) {
                return {
                    "error": "post not found",
                }
            }
            const data = JSON.parse(JSON.stringify(postData));
            post.title = data.title;
            post.metaTitle = data.metaTitle;
            post.slug = data.slug;
            post.summary = data.summary;
            post.media = data.media;
            post.published = data.published;
            post.content = data.content;
            post.categoryId = data.categoryId;
            return await this.postRepository.save(post);
        } catch (error) {
            console.log(error);
        }

    }
    async deletePost(id: number) {
        try {
            const post = await this.postRepository.findOneBy({ id });
            if (post == null) {
                return {
                    "error": "post not found",
                }
            }
            return await this.postRepository.remove(post);
        } catch (error) {
            console.log(error);
        }

    }
    async findUserByPostId(id: number) {
        try {
            return await this.postRepository.createQueryBuilder('post')
                .leftJoinAndSelect('post.user', 'user')
                .where('post.id = :id', { id })
                .getOne();
        } catch (error) {
            console.log(error);
        }

    }
    async findPostsByTitle(dataSearch: string) {
        try {
            const dataPostSearch = dataSearch["dataSearch"];
            return await this.postRepository
                .createQueryBuilder()
                .select()
                .where('MATCH(title, content) AGAINST(:dataPostSearch IN NATURAL LANGUAGE MODE)', {
                    dataPostSearch,
                })
                .getMany();
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
