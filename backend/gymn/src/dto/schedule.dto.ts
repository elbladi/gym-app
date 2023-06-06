import { ApiProperty } from "@nestjs/swagger";
import { ISchedule } from "../types";
import { IsNotEmpty, IsNumber } from "class-validator";

export class Schedule implements ISchedule {
    @ApiProperty({ description: "Time in timestamp at the time the gym opens" })
    @IsNotEmpty()
    @IsNumber()
    openAt: number;

    @ApiProperty({ description: "Time in timestamp at the time the gym opens" })
    @IsNotEmpty()
    @IsNumber()
    closesAt: number;
}
