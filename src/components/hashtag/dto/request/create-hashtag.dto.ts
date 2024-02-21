import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class CreateHashtagDTO {
    @ApiProperty({
        description: 'hashtagName',
        example: 'hashtag',
    })
    @IsString()
    hashtagName: string;
}
