import { IsEmail, IsString, MinLength, MaxLength, IsNumber } from 'class-validator';

export class LoginDTO {
    @IsEmail()
    @MinLength(4)
    email: string;

    @IsString()
    @MinLength(4)
    passwordHash: string;
}

export class RegisterDTO extends LoginDTO {
    @IsString()
    firstName: string;

    @IsString()
    middleName: string;

    @IsString()
    lastName: string;

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    mobile: string;

    @IsNumber()
    roleId: number;

    @IsString()
    intro: string;

    @IsString()
    profile: string;
}