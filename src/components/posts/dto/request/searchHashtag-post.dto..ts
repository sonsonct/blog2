import { ApiProperty } from "@nestjs/swagger";
import { IsNumber } from "class-validator";

export class SearchHashtagPostDTO {
    @ApiProperty({
        description: 'hashtagId',
        example: 18,
    })
    @IsNumber()
    hashtagId: number
}