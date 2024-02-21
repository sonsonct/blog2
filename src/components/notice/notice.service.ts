import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Notice } from 'src/entities/notice.entity';
import { Repository } from 'typeorm';
import { CreateNoticeDTO } from './dto/request/create-notice.dto';
import { SearchNoticeDTO } from './dto/request/search-notice.dto';

@Injectable()
export class NoticeService {
    constructor(
        @InjectRepository(Notice)
        private noticeRepository: Repository<Notice>
    ) { }

    async createNotice(dataNotice: CreateNoticeDTO) {
        try {
            return await this.noticeRepository.save(dataNotice);
        } catch (error) {
            console.log(error);
        }
    }
    async findAll() {
        try {
            return await this.noticeRepository.find();
        } catch (error) {
            console.log(error);
        }
    }
    async pagenation(page: number, pageSize: number) {
        try {
            return await this.noticeRepository.find({
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

        } catch (error) {
            console.log(error);
        }
    }
    async findByUserId(authorId: number) {
        try {
            return await this.noticeRepository.findBy({ authorId: authorId });
        } catch (error) {
            console.log(error);
        }
    }
    async findSearchNotice(dataSearch: SearchNoticeDTO) {
        try {
            const dataNoticeSearch = dataSearch["dataSearch"];

            return await this.noticeRepository
                .createQueryBuilder()
                .select()
                .where('MATCH(contentNotice) AGAINST(:dataNoticeSearch IN NATURAL LANGUAGE MODE)', {
                    dataNoticeSearch,
                })
                .getMany();
        } catch (error) {
            console.log(error);
        }

    }
}
