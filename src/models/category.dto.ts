import { IsNumber, IsString } from "class-validator";

export class CategoryDTO {
    @IsNumber()
    parentId: number;

    @IsString()
    categoryName: string;
}