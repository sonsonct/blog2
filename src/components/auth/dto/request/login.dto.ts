import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDTO {

    @ApiProperty({
        description: 'Email',
        example: 'John@gmail.com',
    })
    @IsEmail()
    @MinLength(4)
    email: string;

    @ApiProperty({
        description: 'password',
        example: '1234567',
    })
    @IsString()
    @MinLength(4)
    passwordHash: string;

}