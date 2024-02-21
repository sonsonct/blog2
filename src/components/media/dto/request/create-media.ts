import { IsNumber, IsString } from "class-validator";

export class CreateMediaDTO {
    @IsNumber()
    postId: number;

    @IsString()
    url: string;
}