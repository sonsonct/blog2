import { IsBoolean, IsNumber, IsString } from "class-validator"

export class NoticeDTO {
    @IsNumber()
    authorId: number;

    @IsString()
    contentNotice: string;

    @IsBoolean()
    status: boolean;
}