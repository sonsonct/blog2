export declare class LoginDTO {
    Email: string;
    Password_Hash: string;
}
export declare class RegisterDTO extends LoginDTO {
    First_Name: string;
    Middle_Name: string;
    Last_Name: string;
    Mobile: string;
    Registered_At: Date;
    Last_Login: string;
    Intro: string;
    Profile: string;
}
