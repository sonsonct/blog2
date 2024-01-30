import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsDTO } from 'src/models/comments.dto';
import { CheckAuthorGuard } from 'src/guard/checkAuthor.guard';

@Controller('comments')
export class CommentsController {
    constructor(
        private commentsService: CommentsService,
    ) { }
    @Get("/all")
    findAll() {
        return this.commentsService.findAll();
    }
    @Get("/page")
    pagenation(
        @Query('page', new ParseIntPipe()) page: number,
        @Query('pageSize', new ParseIntPipe()) pageSize: number
    ) {
        return this.commentsService.pagenation(page, pageSize);
    }
    @Post("/search")
    searchComment(@Body() dataSearch: string) {
        return this.commentsService.findSearchComment(dataSearch);
    }
    @Post("/create")
    createComments(@Body() commentsData: CommentsDTO) {
        return this.commentsService.createComments(commentsData);
    }
    @UseGuards(CheckAuthorGuard)
    @Put("/update")
    updateComments(
        @Query('id', new ParseIntPipe()) id: number,
        @Body() commentsData: CommentsDTO
    ) {
        return this.commentsService.updateComments(id, commentsData);
    }
    @UseGuards(CheckAuthorGuard)
    @Delete("/delete")
    deleteComments(
        @Query('id', new ParseIntPipe()) id: number
    ) {
        return this.commentsService.deleteComments(id);
    }
}
