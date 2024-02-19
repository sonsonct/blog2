import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SearchFaqDTO {
    @ApiProperty({
        description: 'dataSearch',
        example: "question",
    })
    @IsString()
    dataSearch: string
}