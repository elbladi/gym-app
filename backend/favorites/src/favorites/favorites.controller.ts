import { BadRequestException, Body, Controller, Get, Param, Put } from "@nestjs/common";
import { FavoritesService } from "./favorites.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GymDto } from "../dto/gym.dto";

@Controller()
export class FavoritesController {
    constructor(private readonly favService: FavoritesService) {}

    @Put(":userId")
    @ApiTags("Toggle a gym from user's fav list")
    @ApiResponse({ status: 400, description: "Invalid ID provided" })
    @ApiResponse({ status: 200, description: "List of favorite gyms by user provided" })
    async AddToList(@Param("userId") userId: string, @Body() body: GymDto): Promise<GymDto[]> {
        // validate userId & gymId are valid Ids
        if (!this.favService.validateId(userId)) throw new BadRequestException("invalid userId provided");
        if (!this.favService.validateId(body.gymId)) throw new BadRequestException("invalid gymId provided");

        // add gym to user's list
        await this.favService.toggleUsersFav(userId, body);

        // return list updated
        return await this.favService.getFavsByUserId(userId);
    }

    @Get(":userId")
    @ApiTags("Get a list of gyms the user saved as favorites")
    @ApiResponse({ status: 400, description: "Invalid User ID" })
    @ApiResponse({ status: 200, description: "List of favorite gyms by user provided" })
    async getByUser(@Param("userId") userId: string): Promise<GymDto[]> {
        if (!this.favService.validateId(userId)) throw new BadRequestException("invalid User ID");
        return await this.favService.getFavsByUserId(userId);
    }
}
