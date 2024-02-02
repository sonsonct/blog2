import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from 'src/entitys/Media.entity';
import { MediaDTO } from 'src/models/media.dto';
import { Repository } from 'typeorm';

@Injectable()
export class MediaService {
    constructor(
        @InjectRepository(Media)
        private mediaRepository: Repository<Media>,
    ) { }

    async createMedia(dataMedia: MediaDTO) {
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
