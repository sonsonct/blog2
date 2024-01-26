import { Posts } from './Posts.entity';
import { Roles } from './Roles.entity';
export declare class Users {
    id: number;
    First_Name: string;
    Middle_Name: string;
    Last_Name: string;
    Mobile: string;
    Email: string;
    Password_Hash: string;
    Registered_At: Date;
    Last_Login: Date;
    Intro: string;
    Profile: string;
    role_id: number;
    post: Posts[];
    role: Roles;
}
