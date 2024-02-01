import { IsNumber, IsString } from "class-validator";

export class MediaDTO {
    @IsNumber()
    postId: number;

    @IsString()
    url: string;
}