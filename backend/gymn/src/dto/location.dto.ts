import { ApiProperty } from "@nestjs/swagger";
import { ILocation } from "../types";

export class LocationDto implements ILocation {
    @ApiProperty({ description: "latitude", required: true })
    lat: number;
    @ApiProperty({ description: "longitude", required: true })
    lon: number;
}
