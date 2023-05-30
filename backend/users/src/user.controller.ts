import { BadRequestException, Body, Controller, Delete, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("create")
    @ApiTags("Create User")
    @ApiOperation({ description: "Create new user" })
    @ApiResponse({ status: 201, description: "User created" })
    async createNewUser(@Body() data: UserDto): Promise<{ id: string }> {
        try {
            //TODO: ofuscate password
            const id = await this.userService.createUser(data);
            return { id };
        } catch (error) {
            throw new BadRequestException("Ups!");
        }
    }

    @Get()
    @ApiTags("Get All Users")
    @ApiOperation({ description: "Get user" })
    @ApiResponse({ status: 200, description: "User" })
    async getUsers() {
        return await this.userService.getAll();
    }

    @Delete()
    @ApiTags("Delete User")
    @ApiOperation({ description: "Delete user" })
    @ApiResponse({ status: 200, description: "User Deleted" })
    async deleteUser() {
        await this.userService.deleteAll();
        return "ok";
    }
}
