import { IsNegative, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDTO {
    @IsString({ message: 'string 타입 필요'})
    readonly title: string;

    @IsNumber()
    readonly year: number;
    
    @IsOptional()
    @IsString({ each: true })
    readonly genres: string[];
}