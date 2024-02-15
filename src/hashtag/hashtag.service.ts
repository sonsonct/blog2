import { Body, Injectable, ParseIntPipe, Query } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Hashtag } from 'src/entitys/Hashtag.entity';
import { HashtagDTO } from 'src/models/hashtag.dto';
import { Like, Repository } from 'typeorm';

@Injectable()
export class HashtagService {
    constructor(
        @InjectRepository(Hashtag)
        private hashtagRepository: Repository<Hashtag>,
    ) { }

    async findAll() {
        try {
            return await this.hashtagRepository.find();
        } catch (error) {
            console.log(error);
        }
    }

    async create(dataHashtag: HashtagDTO) {
        try {
            const checkName = await this.hashtagRepository.findOneBy({ hashtagName: dataHashtag.hashtagName });

            if (checkName != null) {
                return {
                    "message": "hashtag name exist"
                }
            }

            return await this.hashtagRepository.save(dataHashtag);
        } catch (error) {
            console.log(error);
        }
    }

    async findByHashtagName(hashtagName: any) {
        try {
            return await this.hashtagRepository.find({
                where: {
                    hashtagName: Like(`%${hashtagName["hashtagName"]}%`),
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    async updateHashtag(
        @Query('id', new ParseIntPipe()) id: number,
        @Body() dataHashtag: HashtagDTO
    ) {
        try {
            const hashtag = await this.hashtagRepository.findOneBy({ id: id });

            if (hashtag == null) {
                return {
                    "error": "hashtag not found"
                }
            }

            hashtag.hashtagName = dataHashtag.hashtagName;

            return await this.hashtagRepository.save(hashtag);
        } catch (error) {
            console.log(error);
        }
    }
}
