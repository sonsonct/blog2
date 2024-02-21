import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'src/entities/media.entity';
import { Repository } from 'typeorm';
import { CreateMediaDTO } from './dto/request/create-media';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>,
    ) { }

    async createMedia(dataMedia: CreateMediaDTO) {
        try {
            return await this.mediaRepository.save(dataMedia);
        } catch (error) {
            console.log(error);
        }
    }
    async findAll() {
        try {
            return await this.mediaRepository.find();
        } catch (error) {
            console.log(error);
        }
    }
    async deleteMediaByPostId(postId: number) {
        try {
            return await this.mediaRepository.delete({ postId: postId });
        } catch (error) {
            console.log(error);
        }
    }
}
