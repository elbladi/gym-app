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
    @ApiResponse({ status: 400, description: "Bad Request: Validate the user doesn't exist" })
    async createNewUser(@Body() data: UserDto): Promise<{ id: string }> {
        const userExist = await this.userService.userExist(data.email);
        if (userExist) throw new BadRequestException("User already exists");

        const id = await this.userService.createUser(data);
        return { id };
    }

    @Get()
    @ApiTags("Get All Users")
    @ApiOperation({ description: "Get user" })
    @ApiResponse({ status: 200, description: "User" })
    async getUsers() {
        return await this.userService.getAll();
    }

    @Delete()
    @ApiTags("Delete All Users")
    @ApiOperation({ description: "This operations is only meant to be used for development" })
    @ApiResponse({ status: 200, description: "User Deleted" })
    async deleteUser() {
        await this.userService.deleteAll();
        return "ok";
    }
}
