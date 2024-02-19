import { HashtagService } from './hashtag.service';
import { Body, Controller, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateHashtagDTO } from './dto/request/create-hashtag.dto';

@ApiTags("hashtag")
@Controller('hashtag')
export class HashtagController {
    constructor(
        private hashtagService: HashtagService,
    ) { }

    @Post("/create")
    create(@Body() dataHashtag: CreateHashtagDTO) {
        return this.hashtagService.create(dataHashtag);
    }

    @Get("/all")
    findAll() {
        return this.hashtagService.findAll();
    }
    @Put("/update")
    update(
        @Query('id', new ParseIntPipe()) id: number,
        @Body() hashtagData: CreateHashtagDTO
    ) {
        return this.hashtagService.updateHashtag(id, hashtagData);
    }
    @Post("/findByHashtagName")
    findByHashtagName(@Body() hashtagName: CreateHashtagDTO) {
        return this.hashtagService.findByHashtagName(hashtagName);
    }
}
