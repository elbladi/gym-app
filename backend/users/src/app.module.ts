import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "./mongo.service";
import { UsersModule } from "./users.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                NODE_ENV: Joi.string().valid("development", "production", "test").default("development"),
                MONGO_URI: Joi.string(),
            }),
        }),
        MongooseModule.forRootAsync({
            useClass: MongooseConfigService,
            imports: [ConfigModule],
        }),
        UsersModule,
    ],
})
export class AppModule {}
