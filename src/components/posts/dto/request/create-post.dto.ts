import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator";

export class CreatePostDTO {
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
        description: 'categoryId',
        example: 3,
    })
    @IsNumber()
    categoryId: number;

    @ApiProperty({
        description: 'categoryId',
        example: "title post",
    })
    @IsString()
    title: string;

    @ApiProperty({
        description: 'metaTitle',
        example: "metaTitle post",
    })
    @IsString()
    metaTitle: string;

    @ApiProperty({
        description: 'slug',
        example: "slug post",
    })
    @IsString()
    slug: string;

    @ApiProperty({
        description: 'summary',
        example: "summary post",
    })
    @IsString()
    summary: string;

    @ApiProperty({
        description: 'published',
        example: true,
    })
    @IsBoolean()
    published: boolean;

    @ApiProperty({
        description: 'content',
        example: "content post",
    })
    @IsString()
    content: string;

    @ApiProperty({
        description: 'tag',
        example: [
            {
                "hashtagName": "abcda"
            },
            {
                "hashtagName": "xxxxxa"
            }
        ],
    })
    tag: string[];
}
