import { Users } from './users.entity';
export declare class Posts {
    id: number;
    Author_Id: number;
    Parent_Id: number;
    Title: string;
    Meta_Title: string;
    Slug: string;
    Summary: string;
    Published: boolean;
    Created_At: Date;
    Updated_At: Date;
    Published_At: Date;
    Content: string;
    setPublishedAt(): void;
    updatePublishedAt(): void;
    user: Users;
}
