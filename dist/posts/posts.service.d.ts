import { Posts } from 'src/entitys/Posts.entity';
import { PostDTO } from 'src/models/posts.dto';
import { Repository } from 'typeorm';
export declare class PostsService {
    private postRepository;
    constructor(postRepository: Repository<Posts>);
    getAll(): Promise<Posts[]>;
    createPost(postData: PostDTO): Promise<Posts>;
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
    findUserByPostId(id: number): Promise<Posts | {
        error: string;
    }>;
}
