import { ApiProperty } from "@nestjs/swagger";

export class UserDto {
    @ApiProperty({ description: "User name", required: true })
    name: string;

    @ApiProperty({ description: "User last names", required: true })
    lastNames: string;

    @ApiProperty({ description: "User email", required: true })
    email: string;

    @ApiProperty({
        description: "User password. This value will be hashed and then stored. We won't save plain passwords",
        required: true,
        example: "myPassword --> asdf7623uh23d0329d823dhwdcuiw7",
    })
    password: string;

    @ApiProperty({
        description:
            "User Birthday. We care only month & day since we won't calculate the exact number of years the user va a cumplir",
        required: false,
        example: "07/15/2023",
    })
    birthday?: Date;

    @ApiProperty({
        description: "whether the user want's his profile hidden or not",
        required: false,
        default: false,
    })
    private?: boolean;

    @ApiProperty({
        description: "User's nick name",
        required: false,
        default: "user's name",
    })
    username?: string;

    @ApiProperty({
        description: "whether the user want's to receive notifications or not",
        required: false,
        default: true,
    })
    notifications?: boolean;

    @ApiProperty({
        description: "whether the user want's to receive messages or not",
        required: false,
        default: true,
    })
    messages?: boolean;
}

export class UserEditableDto {
    @ApiProperty({ description: "User name", required: true })
    name: string;

    @ApiProperty({ description: "User last names", required: true })
    lastNames: string;

    @ApiProperty({
        description:
            "User Birthday. We care only month & day since we won't calculate the exact number of years the user va a cumplir",
        required: false,
        example: "07/15/2023",
    })
    birthday: Date;

    @ApiProperty({
        description: "whether the user want's his profile hidden or not",
        required: false,
        default: false,
    })
    private: boolean;

    @ApiProperty({
        description: "User's nick name",
        required: false,
        default: "user's name",
    })
    username: string;

    @ApiProperty({
        description: "whether the user want's to receive notifications or not",
        required: false,
        default: true,
    })
    notifications: boolean;

    @ApiProperty({
        description: "whether the user want's to receive messages or not",
        required: false,
        default: true,
    })
    messages: boolean;
}
