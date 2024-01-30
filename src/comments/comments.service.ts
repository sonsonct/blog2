import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comments } from 'src/entitys/Comments.entity';
import { CommentsDTO } from 'src/models/comments.dto';
import { Repository } from 'typeorm';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comments)
        private commentsRepository: Repository<Comments>,
    ) { }

    async findAll() {
        try {
            return await this.commentsRepository.find();
        } catch (error) {
            console.log(error);
        }
    }
    async findById(id: number) {
        try {
            return await this.commentsRepository.findOneBy({ id });
        } catch (error) {
            console.log(error);
        }
    }

    async createComments(commentsData: CommentsDTO) {
        try {
            return await this.commentsRepository.save(commentsData);
        } catch (error) {
            console.log(error);
        }
    }

    async updateComments(id: number, commentsData: CommentsDTO) {
        try {
            const comments = await this.commentsRepository.findOneBy({ id });
            if (comments == null) {
                return {
                    "error": "comments not found"
                }
            }
            comments.title = commentsData.title;
            comments.published = commentsData.published;
            comments.content = commentsData.content;
            return await this.commentsRepository.save(comments);

        } catch (error) {
            console.log(error);
        }
    }
    async deleteComments(id: number) {
        try {
            const comments = await this.commentsRepository.findOneBy({ id });
            if (comments == null) {
                return {
                    "error": "comments not found"
                }
            }
            return await this.commentsRepository.remove(comments);

        } catch (error) {
            console.log(error);
        }
    }
    async pagenation(page: number, pageSize: number) {
        try {
            return await this.commentsRepository.find({
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

        } catch (error) {
            console.log(error);
        }
    }
    async findSearchComment(dataSearch: string) {
        try {
            const dataCommentSearch = dataSearch["dataSearch"];
            return await this.commentsRepository
                .createQueryBuilder()
                .select()
                .where('MATCH(title, content) AGAINST(:dataCommentSearch IN NATURAL LANGUAGE MODE)', {
                    dataCommentSearch,
                })
                .getMany();
        } catch (error) {
            console.log(error);
        }

    }
}
