import { ApiProperty } from "@nestjs/swagger";
import { INewGym } from "../types";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { HorarioDto } from "./horario.dto";
import { LocationDto } from "./location.dto";
import { ServicesDto } from "./services.dto";
import { RestrictionsDto } from "./restrictions.dto";

export class NewGymDto implements INewGym {
    @ApiProperty({ description: "Owner Id", required: true, example: "6481257dd7cef3e300e5aa7a" })
    @IsNotEmpty()
    @IsString()
    ownerId: string;

    @ApiProperty({ description: "Gym's name", required: true, example: "Juanito" })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ description: "Gym's price per visit in pesos", required: true, example: 80.0 })
    @IsNotEmpty()
    @IsNumber()
    precio: number;

    @ApiProperty({ description: "Gym's horario de visita", required: true, type: HorarioDto })
    @IsNotEmpty()
    horario: HorarioDto;

    @ApiProperty({ description: "Gym's images", required: false })
    images?: string[];

    @ApiProperty({ description: "Gym's location in coordinates", required: false, type: LocationDto })
    location?: LocationDto;

    @ApiProperty({
        description: "Gym's location description",
        required: false,
        example: "Gym el juanito se encuentra frente al tec saltillo",
    })
    locationDesc?: string;

    @ApiProperty({
        description: "Gym's description",
        required: false,
        example: "Juanito gym ofrece los mejores instructores y aparatos para tu beneficio...",
    })
    description?: string;

    @ApiProperty({ description: "Gym's services", required: true, type: ServicesDto })
    services: ServicesDto;

    @ApiProperty({ description: "Gym's restrictions", required: true, type: RestrictionsDto })
    restrictions: RestrictionsDto;
}
