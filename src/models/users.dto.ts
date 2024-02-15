import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

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

export class TokenDTO {
    @ApiProperty({
        description: 'token',
        example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjIsImlhdCI6MTcwNjUwMTk5NiwiZXhwIjoxNzA2NTA1NTk2fQ.J9G5T_qlF0Dibe-qIYGBvSihuMF6L53PltJSPjD_M88',
    })
    @IsString()
    token: string;
}