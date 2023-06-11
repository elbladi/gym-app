import { GetGymDto } from "./get.gym.dto";
import { ApiProperty } from "@nestjs/swagger";

export class FilteredGymDto extends GetGymDto {
    @ApiProperty({ description: "Distance in meters from provided location & gym location" })
    distance: number;
}
