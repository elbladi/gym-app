import { ApiProperty } from "@nestjs/swagger";
import { HorarioDto } from "src/dto/horario.dto";
import { LocationDto } from "src/dto/location.dto";
import { RestrictionsDto } from "src/dto/restrictions.dto";
import { ServicesDto } from "src/dto/services.dto";

export class NewGymResponse {
    @ApiProperty({ description: "Owner Id" })
    ownerId: string;

    @ApiProperty({ description: "Gym Id" })
    gymId: string;

    @ApiProperty({ description: "Gym's name" })
    name: string;

    @ApiProperty({ description: "Gym's price per visit" })
    precio: number;

    @ApiProperty({ description: "Gym's horario de visita", type: HorarioDto })
    horario: HorarioDto;

    @ApiProperty({ description: "Gym's images" })
    images?: string[];

    @ApiProperty({ description: "Gym's location in coordinates", type: LocationDto })
    location?: LocationDto;

    @ApiProperty({ description: "Gym's location description" })
    locationDesc?: string;

    @ApiProperty({ description: "Gym's description" })
    description?: string;

    @ApiProperty({ description: "Gym's services", type: ServicesDto })
    services: ServicesDto;

    @ApiProperty({ description: "Gym's restrictions", type: RestrictionsDto })
    restrictions: RestrictionsDto;
}
