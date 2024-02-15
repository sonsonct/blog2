import { HashtagService } from './../hashtag/hashtag.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Posts } from 'src/entitys/Posts.entity';
import { PostDTO, PostSearchDTO, PostSearchHashtagDTO } from 'src/models/posts.dto';
import { Repository } from 'typeorm';
import { parseJson } from './parseJson';
import { PostsHashtag } from 'src/entitys/PostsHashtag.entity';
import { Hashtag } from 'src/entitys/Hashtag.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Posts)
        private postRepository: Repository<Posts>,

        @InjectRepository(PostsHashtag)
        private postHashtagRepository: Repository<PostsHashtag>,

        @InjectRepository(Hashtag)
        private hashtagRepository: Repository<Hashtag>,

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
            const data = parseJson(postData);

            const post = await this.postRepository.save(data);

            if (data["tag"] != null) {

                const hashtags = data["tag"];

                hashtags.forEach(async (hashtag) => {

                    const hashtagname = hashtag["hashtagName"];

                    const checkHashtag = await this.hashtagRepository.findOneBy({ hashtagName: hashtagname });

                    if (checkHashtag) {

                        const postHashtag = {
                            "postsId": post.id,
                            "hashtagId": checkHashtag.id
                        }

                        await this.postHashtagRepository.save(postHashtag);

                    } else {

                        const dataTag = {
                            "hashtagName": hashtagname
                        }

                        const hashtag = await this.hashtagRepository.save(dataTag);

                        const postHashtag = {
                            "postsId": post.id,
                            "hashtagId": hashtag.id
                        }

                        await this.postHashtagRepository.save(postHashtag);
                    }
                });
            }

            return post;

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

            const data = parseJson(postData);

            post.title = data.title;
            post.metaTitle = data.metaTitle;
            post.slug = data.slug;
            post.summary = data.summary;
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
    async findPostsByTitle(dataSearch: PostSearchDTO) {
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


    async findPostByHashTag(hashtagId: PostSearchHashtagDTO) {
        const id = hashtagId["hashtagId"];

        return await this.postRepository.createQueryBuilder('post')
            .leftJoinAndSelect('post.hashtag', 'hashtag')
            .where('hashtag.id = :hashtagId', { hashtagId: id })
            .getMany();

    }
}
