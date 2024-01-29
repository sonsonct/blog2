import { PostDTO } from 'src/models/posts.dto';
import { PostsService } from './posts.service';
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guard/auth.guard';

@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService,
    ) { }
    @UseGuards(AuthGuard)
    @Post("/create")
    createPost(@Body() postData: PostDTO) {
        return this.postsService.createPost(postData);
    }
    @UseGuards(AuthGuard)
    @Put("/update/:id")
    updatePost(@Param('id') id: number, @Body() postData: PostDTO) {
        return this.postsService.updatePost(id, postData);
    }
    @UseGuards(AuthGuard)
    @Delete("/delete/:id")
    deletePost(@Param('id') id: number) {
        return this.postsService.deletePost(id);
    }
    @Get("/all")
    getAllPost() {
        return this.postsService.getAll();
    }
    @Get("/:id")
    getAuthor(@Param("id") id: number) {
        return this.postsService.findUserByPostId(id);
    }
    @Post("/search")
    getPostsByTitle(@Body() dataSearch: string) {
        return this.postsService.findPostsByTitle(dataSearch);
    }
}
