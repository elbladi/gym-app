import { ApiProperty } from "@nestjs/swagger";

export class UserResponse {
    @ApiProperty({ description: "User name" })
    name: string;

    @ApiProperty({ description: "User last names" })
    lastNames: string;

    @ApiProperty({ description: "User email" })
    email: string;

    @ApiProperty({
        description:
            "User Birthday. We care only month & day since we won't calculate the exact number of years the user va a cumplir",
        example: 1689400800000,
    })
    birthday?: number;
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
