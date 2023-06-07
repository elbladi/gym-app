import { Body, Controller, Post, Put } from "@nestjs/common";
import { GymService } from "./gym.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { NewGymDto } from "../dto/new.gym.dto";
import { NewGymResponse } from "../responses/gym.resp";
import { UpdateGymDto } from "../dto/update.gym.dto";

@Controller("gym")
export class GymController {
    constructor(private readonly gymService: GymService) {}

    @Post("create")
    @ApiTags("Create Gym")
    @ApiOperation({ description: "Create gym" })
    @ApiResponse({ status: 201, description: "Gym created" })
    async createGym(@Body() data: NewGymDto): Promise<NewGymResponse> {
        return await this.gymService.createGym(data);
    }

    @Put("update")
    @ApiTags("Update gym")
    @ApiOperation({ description: "Update Gym's details" })
    @ApiResponse({ status: 200, description: "Gym data updated successfully" })
    @ApiResponse({ status: 404, description: "Gym provided was not found" })
    @ApiResponse({ status: 401, description: "Gym owner is not authorized to update provided gym" })
    async updateGym(@Body() data: UpdateGymDto): Promise<"ok"> {
        await this.gymService.updateGym(data);
        return "ok";
    }
}
