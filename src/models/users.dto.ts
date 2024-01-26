import { IsEmail, IsString, MinLength, MaxLength, IsDate } from 'class-validator';

export class LoginDTO {
    @IsEmail()
    @MinLength(4)
    Email: string;

    @IsString()
    @MinLength(4)
    Password_Hash: string;
}

export class RegisterDTO extends LoginDTO {
    @IsString()
    First_Name: string;

    @IsString()
    Middle_Name: string;

    @IsString()
    Last_Name: string;

    @IsString()
    @MinLength(10)
    @MaxLength(10)
    Mobile: string;

    @IsDate()
    Registered_At: Date;

    @IsDate()
    Last_Login: string;

    @IsString()
    Intro: string;

    @IsString()
    Profile: string;
}