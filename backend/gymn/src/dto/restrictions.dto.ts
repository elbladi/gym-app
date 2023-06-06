import { ApiProperty } from "@nestjs/swagger";
import { IRestrictions } from "../types";

export class RestrictionsDto implements IRestrictions {
    @ApiProperty({ description: "Does the gym allow menores de edad", required: false, default: false })
    children?: boolean;
    @ApiProperty({ description: "Does the gym allow visit partner", required: false, default: false })
    partner?: boolean;
    @ApiProperty({ description: "Does the gym allow pets", required: false, default: false })
    pets?: boolean;
    @ApiProperty({ description: "maximum visits allowed by the gym", required: false, default: 1 })
    maxNum?: number;
}
