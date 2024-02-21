import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SearchPostDTO {
    @ApiProperty({
        description: 'dataSearch',
        example: "post of abc content sample",
    })
    @IsString()
    dataSearch: string
}