import { Comments } from './../entitys/Comments.entity';
import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CommentsDTO {
    @ApiProperty({
        description: 'postId',
        example: 1,
    })
    @IsNumber()
    postId: number;

    @ApiProperty({
        description: 'authorId',
        example: 1,
    })
    @IsNumber()
    authorId: number;

    @ApiProperty({
        description: 'parentId',
        example: null,
    })
    @IsNumber()
    parentId: number;

    @ApiProperty({
        description: 'title',
        example: "title comment",
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'content',
        example: "content comment",
    })
    @IsString()
    content: string;

    @ApiProperty({
        description: 'published',
        example: true,
    })
    published: boolean;
}
export class CommentsSearchDTO {
    @ApiProperty({
        description: 'dataSearch',
        example: 'Comments',
    })
    @IsString()
    dataSearch: string;
}