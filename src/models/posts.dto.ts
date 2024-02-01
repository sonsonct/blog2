import { IsBoolean, IsNumber, IsString } from "class-validator"

export class PostDTO {
    @IsNumber()
    authorId: number;

    @IsNumber()
    parentId: number;

    @IsNumber()
    categoryId: number;

    @IsString()
    title: string;

    @IsString()
    metaTitle: string;

    @IsString()
    slug: string;

    @IsString()
    summary: string;

    @IsBoolean()
    published: boolean;

    @IsString()
    content: string;
}
