import { ApiProperty } from "@nestjs/swagger";
import { IHorario } from "../types";
import { Schedule } from "./schedule.dto";

export class HorarioDto implements IHorario {
    @ApiProperty({ description: "Gym's schedule on Lunes" })
    Lu: Schedule;
    @ApiProperty({ description: "Gym's schedule on Martes" })
    Ma: Schedule;
    @ApiProperty({ description: "Gym's schedule on Miercoles" })
    Mi: Schedule;
    @ApiProperty({ description: "Gym's schedule on Jueves" })
    Ju: Schedule;
    @ApiProperty({ description: "Gym's schedule on Viernes" })
    Vi: Schedule;
    @ApiProperty({ description: "Gym's schedule on Sabado" })
    Sa: Schedule;
    @ApiProperty({ description: "Gym's schedule on Domingo" })
    Do: Schedule;
}
