import { FaqService } from './faq.service';
import { Body, Controller, Delete, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchFaqDTO } from './dto/request/search-faq.dto';
import { CreateFaqDTO } from './dto/request/ceate-faq.dto';

@ApiTags("faq")
@Controller('faq')
export class FaqController {
    constructor(
        private faqService: FaqService
    ) { }

    @Get('/all')
    findAll() {
        return this.faqService.findAll();
    }
    @Post('/create')
    create(
        @Body() dataFaq: CreateFaqDTO
    ) {
        return this.faqService.create(dataFaq);
    }

    @Put('/update')
    update(
        @Query('id', new ParseIntPipe()) id: number,
        @Body() dataFaq: CreateFaqDTO
    ) {
        return this.faqService.update(id, dataFaq);
    }

    @Delete('/delete')
    delete(
        @Query('id', new ParseIntPipe()) id: number,
    ) {
        return this.faqService.delete(id);
    }

    @Post("/search")
    getPostsByTitle(@Body() dataSearch: SearchFaqDTO) {
        return this.faqService.findPostsByQuestion(dataSearch);
    }

    @Get("/page")
    pagenation(
        @Query('page', new ParseIntPipe()) page: number,
        @Query('pageSize', new ParseIntPipe()) pageSize: number
    ) {
        return this.faqService.pagenation(page, pageSize);
    }
}
