import { Body, Controller, Get, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { UserDto } from "./dto/user.dto";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller()
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post()
    @ApiTags("User")
    @ApiOperation({ description: "Create new user" })
    @ApiResponse({ status: 201, description: "User created" })
    createNewUser(@Body() data: UserDto) {
        this.userService.createUser(data);

        return "ok";
    }
}
