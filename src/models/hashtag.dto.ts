import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class HashtagDTO {
    @ApiProperty({
        description: 'hashtagName',
        example: 'hashtag',
    })
    @IsString()
    hashtagName: string;
}
