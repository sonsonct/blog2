import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNumber, IsString, MaxLength, MinLength } from "class-validator";

export class RegisterDTO {
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
        description: 'mobile',
        example: '0999887766',
    })
    @IsString()
    @MinLength(10)
    @MaxLength(10)
    mobile: string;

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
}