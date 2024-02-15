import { Body, Controller, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { NoticeService } from './notice.service';
import { NoticeDTO, NoticeSearchDTO } from 'src/models/notice.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("notice")
@Controller('notice')
export class NoticeController {
    constructor(
        private noticeService: NoticeService
    ) { }
    @Get("/all")
    findAll() {
        return this.noticeService.findAll();
    }
    @Post("/search")
    searchNotice(@Body() dataSearch: NoticeSearchDTO) {
        return this.noticeService.findSearchNotice(dataSearch);
    }
    @Get("/page")
    pagenation(
        @Query('page', new ParseIntPipe()) page: number,
        @Query('pageSize', new ParseIntPipe()) pageSize: number,
    ) {

        return this.noticeService.pagenation(page, pageSize);
    }
    @Post("/create")
    create(@Body() dataNotice: NoticeDTO) {
        return this.noticeService.createNotice(dataNotice);
    }
    @Get("/byUserId")
    findByUserId(
        @Query('authorId', new ParseIntPipe()) authorId: number,
    ) {
        return this.noticeService.findByUserId(authorId);
    }
}
