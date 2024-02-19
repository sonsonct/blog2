import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateFaqDTO {
    @ApiProperty({
        description: 'categoryId',
        example: 3,
    })
    @IsNumber()
    categoryId: number;

    @ApiProperty({
        description: 'question',
        example: 'this is a question',
    })
    @IsString()
    question: string;

    @ApiProperty({
        description: 'answer',
        example: 'this is a answer',
    })
    @IsString()
    answer: string;

    @ApiProperty({
        description: 'published',
        example: true,
    })
    published: boolean;
}