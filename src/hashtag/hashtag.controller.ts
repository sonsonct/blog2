import { HashtagDTO } from 'src/models/hashtag.dto';
import { HashtagService } from './hashtag.service';
import { Body, Controller, Get, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("hashtag")
@Controller('hashtag')
export class HashtagController {
    constructor(
        private hashtagService: HashtagService,
    ) { }

    @Post("/create")
    create(@Body() dataHashtag: HashtagDTO) {
        return this.hashtagService.create(dataHashtag);
    }

    @Get("/all")
    findAll() {
        return this.hashtagService.findAll();
    }
    @Put("/update")
    update(
        @Query('id', new ParseIntPipe()) id: number,
        @Body() hashtagData: HashtagDTO
    ) {
        return this.hashtagService.updateHashtag(id, hashtagData);
    }
    @Post("/findByHashtagName")
    findByHashtagName(@Body() hashtagName: HashtagDTO) {
        return this.hashtagService.findByHashtagName(hashtagName);
    }
}
