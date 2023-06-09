import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Post,
    Put,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto, UserEditableDto } from "./dto/user.dto";
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { UserResponse } from "./responses/userResponse.res";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("create")
    @ApiTags("Create User")
    @ApiOperation({ description: "Create new user" })
    @ApiResponse({ status: 201, description: "User created" })
    @ApiResponse({
        status: 400,
        description: "Bad Request: Validate the user doesn't exist already",
    })
    async createNewUser(@Body() data: UserDto): Promise<{ id: string }> {
        const userExist = await this.userService.userExist(data.email);
        if (userExist) throw new BadRequestException(`email ${data.email} already exists`);

        const id = await this.userService.createUser(data);
        return { id };
    }

    @Put(":id")
    @ApiTags("Update user")
    @ApiParam({
        name: "id",
        description: "user id",
        required: true,
        allowEmptyValue: false,
        example: "64758ba575eae3ee89076fdd",
    })
    @ApiOperation({ description: "Update the user" })
    @ApiResponse({ status: 200, description: "user details updated" })
    @ApiResponse({ status: 400, description: "user probably doesnt exist" })
    async updateUser(@Param("id") userId: string, @Body() body: UserEditableDto): Promise<string> {
        const userExist = await this.userService.userExistById(userId);
        if (!userExist) throw new BadRequestException(`User ${userId} not found`);

        await this.userService.updateUser(userId, body);
        return "ok";
    }

    @Get(":id")
    @ApiTags("Get user details")
    @ApiParam({
        name: "id",
        description: "user id",
        required: true,
        allowEmptyValue: false,
        example: "64758ba575eae3ee89076fdd",
    })
    @ApiOperation({ description: "Get user details" })
    @ApiResponse({ status: 200, description: "user details", type: UserResponse })
    @ApiResponse({ status: 400, description: "user probably doesnt exist" })
    async getUser(@Param("id") userId: string): Promise<UserResponse> {
        const userExist = await this.userService.userExistById(userId);
        if (!userExist) throw new BadRequestException(`User ${userId} not found`);

        return await this.userService.getUser(userId);
    }

    @Get()
    @ApiTags("Get All Users")
    @ApiOperation({ description: "Get all users. Dev only" })
    @ApiResponse({ status: 200, description: "User" })
    async getUsers() {
        return await this.userService.getAll();
    }

    @Delete()
    @ApiTags("Delete")
    @ApiOperation({ description: "This operations is only meant to be used for development" })
    @ApiResponse({ status: 200, description: "User Deleted" })
    async deleteAllUsers() {
        await this.userService.deleteAll();
        return "ok";
    }

    @Delete(":id")
    @ApiTags("Delete")
    @ApiOperation({ description: "Delete specified user if exists" })
    @ApiResponse({ status: 200, description: "User Deleted" })
    async deleteUser(@Param("id") userId: string) {
        if (!(await this.userService.userExistById(userId))) {
            throw new NotFoundException(`user ${userId} not found`);
        }
        await this.userService.deleteUser(userId);
        return "ok";
    }
}
