import { ApiProperty } from "@nestjs/swagger";
import { ILocation } from "../types";

export class LocationDto implements ILocation {
    @ApiProperty({ description: "latitude", required: true, example: 25.444227 })
    lat: number;
    @ApiProperty({ description: "longitude", required: true, example: -100.995208 })
    lon: number;
}
