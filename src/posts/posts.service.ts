import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entitys/Posts.entity';
import { PostDTO } from 'src/models/posts.dto';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postRepository: Repository<Posts>
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
            const post = this.postRepository.create(postData);
            await this.postRepository.save(post);
            return post;
        } catch (error) {
            console.log(error);
        }

    }


    async updatePost(id: number, postData: PostDTO) {
        //console.log(id);
        try {
            const post = await this.postRepository.findOneBy({ id });
            if (post == null) {
                return {
                    "error": "post not found",
                }
            }
            post.title = postData.title;
            post.metaTitle = postData.metaTitle;
            post.slug = postData.slug;
            post.summary = postData.summary;
            post.published = postData.published;
            post.content = postData.content;
            this.postRepository.save(post);
            return {
                "success": "updated successfully",
            };
        } catch (error) {
            console.log(error);
        }

    }

    async deletePost(id: number) {
        //console.log(id);
        try {
            const post = await this.postRepository.findOneBy({ id });
            if (post == null) {
                return {
                    "error": "post not found",
                }
            }
            this.postRepository.remove(post);
            return {
                "success": "delete successfully",
            };
        } catch (error) {
            console.log(error);
        }

    }


    async findUserByPostId(id: number) {
        //console.log(id);
        try {
            const data = await this.postRepository.createQueryBuilder('post')
                .leftJoinAndSelect('post.user', 'user')
                .where('post.id = :id', { id })
                .getOne();
            if (data == null) {
                return {
                    "error": "post not found",
                }
            }
            return data;
        } catch (error) {
            console.log(error);
        }

    }


    async findPostsByTitle(dataSearch: string) {
        //console.log(dataSearch["title"]);
        try {
            const dataPostSearch = dataSearch["dataSearch"];

            const data = await this.postRepository
                .createQueryBuilder()
                .select()
                .where('MATCH(title, content) AGAINST(:dataPostSearch IN NATURAL LANGUAGE MODE)', {
                    dataPostSearch,
                })
                .getMany();
            if (data.length <= 0) {
                return {
                    "message": "post not found",
                }
            }
            return data;
        } catch (error) {
            console.log(error);
        }

    }

}
