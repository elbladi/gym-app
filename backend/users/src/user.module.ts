import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
            }),
        }),
    ],
    controllers: [UserController],
    providers: [UserService],
})
export class AppModule {}
