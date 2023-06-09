import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { HorarioDto } from "./horario.dto";
import { LocationDto } from "./location.dto";
import { ServicesDto } from "./services.dto";
import { RestrictionsDto } from "./restrictions.dto";

export class GetGymDto {
    @ApiProperty({ description: "Gym Id", required: true })
    @IsNotEmpty()
    @IsString()
    gymId: string;

    @ApiProperty({ description: "Gym's name", required: true })
    @IsString()
    name: string;

    @ApiProperty({ description: "Gym's price per visit", required: false })
    @IsNumber()
    @IsOptional()
    precio?: number;

    @ApiProperty({ description: "Gym's horario de visita", required: false, type: HorarioDto })
    @IsOptional()
    horario?: HorarioDto;

    @ApiProperty({ description: "Gym's images", required: false })
    @IsOptional()
    images?: string[];

    @ApiProperty({ description: "Gym's location in coordinates", required: false, type: LocationDto })
    @IsOptional()
    location?: LocationDto;

    @ApiProperty({ description: "Gym's location description", required: false })
    @IsOptional()
    locationDesc?: string;

    @ApiProperty({ description: "Gym's description", required: false })
    @IsOptional()
    description?: string;

    @ApiProperty({ description: "Gym's services", required: false, type: ServicesDto })
    services: ServicesDto;

    @ApiProperty({ description: "Gym's restrictions", required: false, type: RestrictionsDto })
    restrictions: RestrictionsDto;
}
