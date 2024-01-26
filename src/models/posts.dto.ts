import { IsBoolean, IsNumber, IsString } from "class-validator"

export class PostDTO {
    @IsNumber()
    Author_Id: number;

    @IsNumber()
    Parent_Id: number;

    @IsString()
    Title: string;

    @IsString()
    Meta_Title: string;

    @IsString()
    Slug: string;

    @IsString()
    Summary: string;

    @IsBoolean()
    Published: boolean;

    @IsString()
    Content: string;
}