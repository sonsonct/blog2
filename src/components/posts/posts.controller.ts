import { MediaService } from '../media/media.service';
import { PostsService } from './posts.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/core/guard/auth.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { SearchHashtagPostDTO } from './dto/request/searchHashtag-post.dto.';
import { SearchPostDTO } from './dto/request/search-post.dto';
import { CreateCategoryDTO } from '../category/dto/request/create-category.dto';

@ApiTags("posts")
@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService,
        private mediaService: MediaService,
    ) { }
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('media', 20))
    @Post("/create")
    async createPost(@Body() postData: CreateCategoryDTO, @UploadedFiles() files: Express.Multer.File[]) {

        const post = await this.postsService.createPost(postData);

        if (files != null && files.length > 0) {
            files.forEach(async (file) => {
                if (file.size > 1024 * 1024 * 10) {
                    return {
                        "message": `File ${file.originalname} size > 10MB`
                    };
                }

                const media = await this.postsService.uploadFileToCloudinary(file);

                const dataMedia = {
                    "postId": post.id,
                    "url": media["url"],
                };

                await this.mediaService.createMedia(dataMedia);
            });
        }

        return post;
    }
    @UseGuards(AuthGuard)
    @UseInterceptors(FilesInterceptor('media', 20))
    @Put("/update")
    async updatePost(
        @Query('id', new ParseIntPipe()) id: number,
        @Body() postData: CreateCategoryDTO,
        @UploadedFiles() files: Express.Multer.File[]
    ) {
        const post = await this.postsService.updatePost(id, postData);

        await this.mediaService.deleteMediaByPostId(id);

        if (files != null || files.length > 0) {
            files.forEach(async (file) => {
                if (file.size > 1024 * 1024 * 10) {
                    return {
                        "message": `File ${file.originalname} size > 10MB`
                    };
                }

                const media = await this.postsService.uploadFileToCloudinary(file);

                const dataMedia = {
                    "postId": id,
                    "url": media["url"],
                };

                await this.mediaService.createMedia(dataMedia);
            });
        }

        return post;
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
    getPostsByTitle(@Body() dataSearch: SearchPostDTO) {
        return this.postsService.findPostsByTitle(dataSearch);
    }

    @Post('hashtag')
    findByHashtag(@Body() hashtagId: SearchHashtagPostDTO) {
        return this.postsService.findPostByHashTag(hashtagId);
    }
}
