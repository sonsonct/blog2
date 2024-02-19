import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SearchCategoryDTO {
    @ApiProperty({
        description: 'categoryName',
        example: "abc",
    })
    @IsString()
    categoryName: string;
}