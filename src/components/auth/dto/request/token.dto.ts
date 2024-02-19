import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class TokenDTO {
    @ApiProperty({
        description: 'token',
        example: 'your token',
    })
    @IsString()
    token: string;
}