import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { GymDto } from "./gym.dto";

export class FavoriteDto {
    @ApiProperty({ description: "User's Id", example: "6484dcb71d71c16d6f16354d" })
    @IsString()
    @IsNotEmpty()
    userId: string;

    @ApiProperty({ description: "List with all gyms flagged as favorited", type: GymDto, isArray: true })
    list: GymDto[];
}
