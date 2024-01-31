import { PostDTO } from 'src/models/posts.dto';
import { PostsService } from './posts.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';


@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService,
    ) { }
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('media', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        }),
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
    }))
    @Post("/create")
    createPost(@Body() postData: PostDTO, @UploadedFile() file: Express.Multer.File) {
        if (file != null) {
            postData.media = file.filename;
            return this.postsService.createPost(postData);
        }
        return this.postsService.createPost(postData);

    }
    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor('media', {
        storage: diskStorage({
            destination: './uploads',
            filename: (req, file, callback) => {
                callback(null, file.originalname);
            },
        }),
        limits: {
            fileSize: 1024 * 1024 * 5,
        },
    }))
    @Put("/update")
    updatePost(
        @Query('id', new ParseIntPipe()) id: number,
        @Body() postData: PostDTO,
        @UploadedFile() file: Express.Multer.File
    ) {
        if (file != null) {
            postData.media = file.filename;
            return this.postsService.updatePost(id, postData);
        }
        return this.postsService.updatePost(id, postData);
    }
    @UseGuards(AuthGuard)
    @Delete("/delete")
    deletePost(
        @Query('id', new ParseIntPipe()) id: number,
    ) {
        return this.postsService.deletePost(id);
    }
    @Get("/all")
    getAllPost() {
        return this.postsService.getAll();
    }
    @Get()
    getAuthor(
        @Query('id', new ParseIntPipe()) id: number,
    ) {
        return this.postsService.findUserByPostId(id);
    }
    @Post("/search")
    getPostsByTitle(@Body() dataSearch: string) {
        return this.postsService.findPostsByTitle(dataSearch);
    }
}
