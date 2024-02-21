import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class SearchCommentsDTO {
    @ApiProperty({
        description: 'dataSearch',
        example: 'Comments',
    })
    @IsString()
    dataSearch: string;
}