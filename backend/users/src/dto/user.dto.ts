import { ApiProperty } from "@nestjs/swagger";
import { IUser } from "../types";
import { IsNotEmpty, Length, IsNumber, IsEmail, IsBoolean, IsString, IsOptional } from "class-validator";
export class UserDto implements IUser {
    @ApiProperty({ description: "User name", required: true, example: "Jonathan" })
    @IsNotEmpty()
    @Length(5, 20)
    name: string;

    @ApiProperty({ description: "User last names", required: true, example: "Ken smallville" })
    @IsNotEmpty()
    @Length(5, 20)
    lastNames: string;

    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ description: "User email", required: true, example: "test@test.com" })
    email: string;

    @IsNotEmpty()
    @Length(10, 20)
    @ApiProperty({
        description: "User password. This value will be hashed and then stored. We won't save plain passwords",
        required: true,
        example: "MySecretPassword",
    })
    password: string;

    @ApiProperty({
        description: "whether the user is Gym owner",
        required: true,
        default: false,
    })
    @IsBoolean()
    isOwner: boolean;

    @ApiProperty({
        description:
            "User Birthday. We care only month & day since we won't calculate the exact number of years the user va a cumplir",
        required: false,
        example: 1689400800000,
    })
    @IsNumber()
    @IsOptional()
    birthday?: number;

    @ApiProperty({
        description: "whether the user want's his profile hidden or not",
        required: false,
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    private?: boolean;

    @ApiProperty({
        description: "User's nick name",
        required: false,
        example: "Barto",
    })
    @IsString()
    @IsOptional()
    username?: string;

    @ApiProperty({
        description: "whether the user want's to receive notifications or not",
        required: false,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    notifications?: boolean;

    @ApiProperty({
        description: "whether the user want's to receive messages or not",
        required: false,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    messages?: boolean;
}

export class UserEditableDto {
    @IsString()
    @IsOptional()
    @ApiProperty({ description: "User name", example: "Jonathan", required: false })
    name?: string;

    @ApiProperty({ description: "User last names", example: "Ken smallville", required: false })
    @IsOptional()
    @IsString()
    lastNames?: string;

    @ApiProperty({
        description:
            "User Birthday. We care only month & day since we won't calculate the exact number of years the user va a cumplir",
        required: false,
        example: 1689400800000,
    })
    @IsNumber()
    @IsOptional()
    birthday?: number;

    @ApiProperty({
        description: "whether the user want's his profile hidden or not",
        required: false,
        default: false,
    })
    @IsBoolean()
    @IsOptional()
    private?: boolean;

    @ApiProperty({
        description: "User's nick name",
        required: false,
        default: "Barto",
    })
    @IsOptional()
    @IsString()
    username?: string;

    @ApiProperty({
        description: "whether the user want's to receive notifications or not",
        required: false,
        default: true,
    })
    @IsBoolean()
    @IsOptional()
    notifications?: boolean;

    @ApiProperty({
        description: "whether the user want's to receive messages or not",
        required: false,
        default: true,
    })
    @IsOptional()
    @IsBoolean()
    messages?: boolean;
}
