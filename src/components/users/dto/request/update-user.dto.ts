import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUserDTO {

    @ApiProperty({
        description: 'password',
        example: '1234567',
    })
    @IsString()
    @MinLength(4)
    passwordHash: string;
    @ApiProperty({
        description: 'firstName',
        example: 'John',
    })
    @IsString()
    firstName: string;

    @ApiProperty({
        description: 'middleName',
        example: 'def',
    })
    @IsString()
    middleName: string;

    @ApiProperty({
        description: 'lastName',
        example: 'chu',
    })
    @IsString()
    lastName: string;

    @ApiProperty({
        description: 'roleId',
        example: 1,
    })
    @IsNumber()
    roleId: number;

    @ApiProperty({
        description: 'intro',
        example: 'hello world',
    })
    @IsString()
    intro: string;

    @ApiProperty({
        description: 'profile',
        example: 'profile me',
    })
    @IsString()
    profile: string;

    @ApiProperty({
        description: 'avataUser',
        example: 'url avata user',
    })
    @IsString()
    avataUser: string;
}