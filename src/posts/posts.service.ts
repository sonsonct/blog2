import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Posts } from 'src/entitys/Posts.entity';
import { PostDTO } from 'src/models/posts.dto';
import { Repository } from 'typeorm';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postRepository: Repository<Posts>
    ) { }

    async getAll() {
        return await this.postRepository.find();
    }
    async createPost(postData: PostDTO) {
        const post = this.postRepository.create(postData);
        await this.postRepository.save(post);
        return post;
    }


    async updatePost(id: number, postData: PostDTO) {
        //console.log(id);
        const post = await this.postRepository.findOneBy({ id });
        if (post == null) {
            return {
                "error": "post not found",
            }
        } else {
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

    async deletePost(id: number) {
        //console.log(id);
        const post = await this.postRepository.findOneBy({ id });
        if (post == null) {
            return {
                "error": "post not found",
            }
        } else {
            this.postRepository.remove(post);
            return {
                "success": "delete successfully",
            };
        }
    }


    async findUserByPostId(id: number) {
        //console.log(id);
        const data = await this.postRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.user', 'user')
            .where('post.id = :id', { id })
            .getOne();
        if (data == null) {
            return {
                "error": "post not found",
            }
        } else {
            return data;
        }
    }


    // async sharePost(author_id : number, content: string, Parent_Id: number) {
    //     //console.log(id);

    //     const post = this.postRepository.create();



    // }
}
