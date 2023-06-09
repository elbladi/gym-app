import { ApiProperty } from "@nestjs/swagger";
import { IHorario } from "../types";
import { Schedule } from "./schedule.dto";

export class HorarioDto implements IHorario {
    @ApiProperty({
        description: "Gym's schedule on Lunes",
        example: { openAt: 1689446700000, closesAt: 1689480000000 },
        type: Schedule,
    })
    Lu: Schedule;
    @ApiProperty({
        description: "Gym's schedule on Martes",
        example: { openAt: 1689446700000, closesAt: 1689480000000 },
        type: Schedule,
    })
    Ma: Schedule;
    @ApiProperty({
        description: "Gym's schedule on Miercoles",
        example: { openAt: 1689446700000, closesAt: 1689480000000 },
        type: Schedule,
    })
    Mi: Schedule;
    @ApiProperty({
        description: "Gym's schedule on Jueves",
        example: { openAt: 1689446700000, closesAt: 1689480000000 },
        type: Schedule,
    })
    Ju: Schedule;

    @ApiProperty({
        description: "Gym's schedule on Viernes",
        example: { openAt: 1689446700000, closesAt: 1689480000000 },
        type: Schedule,
    })
    Vi: Schedule;

    @ApiProperty({
        description: "Gym's schedule on Sabado",
        example: { openAt: 1689446700000, closesAt: 1689480000000 },
        type: Schedule,
    })
    Sa: Schedule;

    @ApiProperty({
        description: "Gym's schedule on Domingo",
        example: { closed: true },
        type: Schedule,
    })
    Do: Schedule;
}
