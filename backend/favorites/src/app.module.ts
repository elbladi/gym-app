import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { MongooseModule } from "@nestjs/mongoose";
import * as Joi from "joi";
import { MongooseConfigService } from "./mongo.service";
import { FavoritesModule } from "./favorites/favorites.module";
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
        FavoritesModule,
    ],
})
export class AppModule {}
