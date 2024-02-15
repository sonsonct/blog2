import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CategoryDTO {
    @ApiProperty({
        description: 'parentId',
        example: 3,
    })
    @IsNumber()
    parentId: number;

    @ApiProperty({
        description: 'categoryName',
        example: "category abc",
    })
    @IsString()
    categoryName: string;
}

export class CategorySearchDTO {
    @ApiProperty({
        description: 'categoryName',
        example: "abc",
    })
    @IsString()
    categoryName: string;
}