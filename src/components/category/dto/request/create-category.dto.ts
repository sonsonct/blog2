import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateCategoryDTO {
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
