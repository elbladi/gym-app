import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { MongooseModule } from "@nestjs/mongoose";
import { MongooseConfigService } from "./mongo.service";
import { GymModule } from "./gym/gym.module";

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
        GymModule,
    ],
})
export class AppModule {}
