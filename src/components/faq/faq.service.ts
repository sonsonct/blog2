import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Faq } from 'src/entities/faq.entity';
import { Repository } from 'typeorm';
import { SearchFaqDTO } from './dto/request/search-faq.dto';
import { CreateFaqDTO } from './dto/request/ceate-faq.dto';

@Injectable()
export class FaqService {
    constructor(
        @InjectRepository(Faq)
        private faqRepository: Repository<Faq>
    ) { }

    async findAll() {
        try {

            return await this.faqRepository.find();

        } catch (error) {
            console.log(error);
        }
    }

    async create(dataFaq: CreateFaqDTO) {
        try {

            return await this.faqRepository.save(dataFaq);

        } catch (error) {
            console.log(error);
        }
    }

    async update(id: number, dataFaq: CreateFaqDTO) {
        try {
            const faq = await this.faqRepository.findOneBy({ id: id });
            if (faq == null) {
                return {
                    "error": "Faq not found"
                }
            }

            faq.categoryId = dataFaq.categoryId;
            faq.question = dataFaq.question;
            faq.answer = dataFaq.answer;
            faq.published = dataFaq.published;

            return this.faqRepository.save(faq);
        } catch (error) {
            console.log(error);
        }
    }

    async delete(id: number) {
        try {
            const faq = await this.faqRepository.findOneBy({ id: id });
            if (faq == null) {
                return {
                    "error": "Faq not found"
                }
            }

            return this.faqRepository.remove(faq);
        } catch (error) {
            console.log(error);
        }
    }

    async findPostsByQuestion(dataSearch: SearchFaqDTO) {
        try {
            const dataFaqSearch = dataSearch["dataSearch"];

            return await this.faqRepository
                .createQueryBuilder()
                .select()
                .where('MATCH(question, answer) AGAINST(:dataFaqSearch IN NATURAL LANGUAGE MODE)', {
                    dataFaqSearch,
                })
                .getMany();
        } catch (error) {
            console.log(error);
        }

    }
    async pagenation(page: number, pageSize: number) {
        try {
            return await this.faqRepository.find({
                take: pageSize,
                skip: (page - 1) * pageSize,
            });

        } catch (error) {
            console.log(error);
        }
    }
}
