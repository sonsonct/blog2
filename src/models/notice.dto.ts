import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNumber, IsString } from "class-validator"

export class NoticeDTO {
    @ApiProperty({
        description: 'authorId',
        example: 1,
    })
    @IsNumber()
    authorId: number;

    @ApiProperty({
        description: 'contentNotice',
        example: "contentNotice",
    })
    @IsString()
    contentNotice: string;

    @ApiProperty({
        description: 'contentNotice',
        example: "contentNotice",
    })

    @IsBoolean()
    status: boolean;
}
export class NoticeSearchDTO {
    @ApiProperty({
        description: 'dataSearch',
        example: 'abc',
    })
    @IsString()
    dataSearch: string;
}