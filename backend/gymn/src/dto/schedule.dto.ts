import { ApiProperty } from "@nestjs/swagger";
import { ISchedule } from "../types";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export class Schedule implements ISchedule {
    @ApiProperty({ description: "Time in timestamp at the time the gym opens", example: 1689446700000 })
    @IsNumber()
    @IsOptional()
    openAt?: number;

    @ApiProperty({ description: "Time in timestamp at the time the gym opens", example: 1689480000000 })
    @IsNumber()
    @IsOptional()
    closesAt?: number;

    @ApiProperty({ description: "Is the gym closed today?", example: true, default: true, required: false })
    @IsOptional()
    @IsBoolean()
    closed?: boolean;
}
