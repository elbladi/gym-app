import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class GymDto {
    @ApiProperty({ description: "Gym's Id", example: "6484dcb71d71c16d6f16354d" })
    @IsNotEmpty()
    @IsString()
    gymId: string;

    @ApiProperty({ description: "Gym's Name", example: "Juanito" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: "Gym's Rating average from 0 to 5", example: 3.75 })
    @IsNotEmpty()
    @IsNumber()
    rating: number;

    @ApiProperty({ description: "Gym's Price per visit", example: 50 })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ description: "Gym's images url's", example: ["image1.webp", "image2.webp"], isArray: true })
    @IsNotEmpty()
    images: string[];

    @ApiProperty({ description: "Gym's distance in km", example: 0.75 })
    @IsNumber()
    @IsOptional()
    distance?: number;
}
