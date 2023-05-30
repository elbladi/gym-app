import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "../types";
import { IsNotEmpty, Length, IsNumber, IsEmail, IsBoolean, IsString } from "class-validator";
export class UserDto implements IUser {
    @ApiProperty({ description: "User name", required: true })
    @IsNotEmpty()
    @Length(5, 20)
    name: string;

    @ApiProperty({ description: "User last names", required: true })
    @IsNotEmpty()
    @Length(5, 20)
    lastNames: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: "User email", required: true })
    email: string;

    @IsNotEmpty()
    @Length(10, 20)
    @ApiProperty({
        description: "User password. This value will be hashed and then stored. We won't save plain passwords",
        required: true,
        example: "asdf7623uh23d032eqwe",
    })
    password: string;

    @ApiProperty({
        description:
            "User Birthday. We care only month & day since we won't calculate the exact number of years the user va a cumplir",
        required: false,
        example: 1689400800000,
    })
    @IsNumber()
    birthday?: number;

    @ApiProperty({
        description: "whether the user want's his profile hidden or not",
        required: false,
        default: false,
    })
    @IsBoolean()
    private?: boolean;

    @ApiProperty({
        description: "User's nick name",
        required: false,
        default: "user's name",
    })
    @IsString()
    username?: string;

    @ApiProperty({
        description: "whether the user want's to receive notifications or not",
        required: false,
        default: true,
    })
    @IsBoolean()
    notifications?: boolean;

    @ApiProperty({
        description: "whether the user want's to receive messages or not",
        required: false,
        default: true,
    })
    @IsBoolean()
    messages?: boolean;
}

export class UserEditableDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ description: "User name", required: true })
    name?: string;

    @ApiProperty({ description: "User last names", required: true })
    @IsString()
    lastNames?: string;

    @ApiProperty({
        description:
            "User Birthday. We care only month & day since we won't calculate the exact number of years the user va a cumplir",
        required: false,
        example: "07/15/2023",
    })
    @IsNumber()
    birthday?: number;

    @ApiProperty({
        description: "whether the user want's his profile hidden or not",
        required: false,
        default: false,
    })
    @IsBoolean()
    private?: boolean;

    @ApiProperty({
        description: "User's nick name",
        required: false,
        default: "user's name",
    })
    @IsString()
    username?: string;

    @ApiProperty({
        description: "whether the user want's to receive notifications or not",
        required: false,
        default: true,
    })
    @IsBoolean()
    notifications?: boolean;

    @ApiProperty({
        description: "whether the user want's to receive messages or not",
        required: false,
        default: true,
    })
    @IsBoolean()
    messages?: boolean;
}
