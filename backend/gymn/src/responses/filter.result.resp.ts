import { ApiProperty } from "@nestjs/swagger";
import type { FilterResult } from "../types";
import { FilteredGymDto } from "src/dto/filtered.gym.dto";

export class FilterResponse implements FilterResult {
    @ApiProperty({ description: "List of gyms that are at least 1km within the provided location" })
    gyms: FilteredGymDto[];

    @ApiProperty({ description: "Distance in meters from provided location & gym location" })
    farCounter: number;
}
