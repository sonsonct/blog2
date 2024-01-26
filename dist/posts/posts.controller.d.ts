import { PostDTO } from 'src/models/posts.dto';
import { PostsService } from './posts.service';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    createPost(postData: PostDTO): Promise<import("../entitys/Posts.entity").Posts>;
    updatePost(id: number, postData: PostDTO): Promise<{
        error: string;
        success?: undefined;
    } | {
        success: string;
        error?: undefined;
    }>;
    deletePost(id: number): Promise<{
        error: string;
        success?: undefined;
    } | {
        success: string;
        error?: undefined;
    }>;
    getAllPost(): Promise<import("../entitys/Posts.entity").Posts[]>;
    getAuthor(id: number): Promise<import("../entitys/Posts.entity").Posts | {
        error: string;
    }>;
}
