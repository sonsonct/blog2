import { IsNumber, IsString } from "class-validator";

export class CommentsDTO {
    @IsNumber()
    postId: number;

    @IsNumber()
    authorId: number;

    @IsNumber()
    parentId: number;

    @IsString()
    title: string;

    @IsString()
    content: string;

    published: boolean;
}