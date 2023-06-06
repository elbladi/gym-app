import { ApiProperty } from "@nestjs/swagger";
import { IServices } from "../types";

export class ServicesDto implements IServices {
    @ApiProperty({ description: "Does the Gym has bathroom?", default: false, required: false })
    bathroom?: boolean;
    @ApiProperty({ description: "Does the Gym has shower?", default: false, required: false })
    shower?: boolean;
    @ApiProperty({ description: "Does the Gym has food?", default: false, required: false })
    food?: boolean;
    @ApiProperty({ description: "Does the Gym has lockers?", default: false, required: false })
    lockers?: boolean;
    @ApiProperty({ description: "Does the Gym has wifi?", default: false, required: false })
    wifi?: boolean;
    @ApiProperty({ description: "Does the Gym has parking?", default: false, required: false })
    parking?: boolean;
    @ApiProperty({ description: "Does the Gym has restroom?", default: false, required: false })
    restroom?: boolean;
}
