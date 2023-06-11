import { BadRequestException, Body, Controller, Get, Param, Post, Put, UnauthorizedException } from "@nestjs/common";
import { GymService } from "./gym.service";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { NewGymDto } from "../dto/new.gym.dto";
import { NewGymResponse } from "../responses/gym.resp";
import { UpdateGymDto } from "../dto/update.gym.dto";
import { GetGymDto } from "../dto/get.gym.dto";
import { filterGyms } from "./utils";
import { FilterResponse } from "../responses/filter.result.resp";

@Controller()
export class GymController {
    constructor(private readonly gymService: GymService) {}

    @Post("create")
    @ApiTags("Create Gym")
    @ApiOperation({ description: "Create gym" })
    @ApiResponse({ status: 201, description: "Gym created" })
    @ApiResponse({ status: 400, description: "Provided owner ID is not valid", type: BadRequestException })
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

    @ApiTags("Get Operations")
    @Get(":id")
    @ApiOperation({ description: "Get the gym details" })
    @ApiResponse({ status: 200, description: "Here's the details of the gym you asked", type: GetGymDto })
    @ApiResponse({ status: 404, description: "Provided gym id couldn't be found" })
    @ApiResponse({ status: 401, description: "You have provided an invalid gym Id" })
    async getGymById(@Param("id") gymId: string): Promise<GetGymDto> {
        const isIdValid = this.gymService.validateId(gymId);
        if (!isIdValid) throw new UnauthorizedException(`ID: ${gymId} is not a valid Id`);

        return await this.gymService.getGymById(gymId);
    }

    @ApiTags("Get Operations")
    @Get()
    @ApiOperation({ description: "Get a list of gym details" })
    @ApiResponse({ status: 200, description: "List all the gyms", type: GetGymDto, isArray: true })
    async getAllGyms(): Promise<GetGymDto[]> {
        return await this.gymService.getAllGyms();
    }

    @ApiTags("Get Operations")
    @Get(":lat/:lon")
    @ApiOperation({
        description: "List of gyms that are closed to the provided location, with a threashold of 1km",
    })
    @ApiResponse({
        status: 200,
        description: "List with all gyms and a number of how many gyms didn't make the filter",
        type: GetGymDto,
        isArray: true,
    })
    async getNearGyms(@Param("lat") lat: number, @Param("lon") lon: number): Promise<FilterResponse> {
        //TODO get all gyms BY CITY to shorthen the list.
        const gymList: GetGymDto[] = await this.gymService.getAllGyms();

        return filterGyms(gymList, { lat, lon });
    }
}
