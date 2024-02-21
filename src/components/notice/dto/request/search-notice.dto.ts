import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SearchNoticeDTO {
    @ApiProperty({
        description: 'dataSearch',
        example: 'abc',
    })
    @IsString()
    dataSearch: string;
}