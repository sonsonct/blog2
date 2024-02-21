import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CheckAuthorGuard } from 'src/core/guard/checkAuthor.guard';
import { ApiTags } from '@nestjs/swagger';
import { SearchCommentsDTO } from './dto/request/search-comment.dto';
import { CreateCommentsDTO } from './dto/request/create-comment.dto';

@ApiTags("comments")
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
    searchComment(@Body() dataSearch: SearchCommentsDTO) {
        return this.commentsService.findSearchComment(dataSearch);
    }
    @Post("/create")
    createComments(@Body() commentsData: CreateCommentsDTO) {
        return this.commentsService.createComments(commentsData);
    }
    @UseGuards(CheckAuthorGuard)
    @Put("/update")
    updateComments(
        @Query('id', new ParseIntPipe()) id: number,
        @Body() commentsData: CreateCommentsDTO
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
