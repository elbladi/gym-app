import { Module } from "@nestjs/common";
import { FavoritesController } from "./favorites.controller";
import { FavoritesService } from "./favorites.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Favorites, FavoritesSchema } from "../schemas/favorites.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Favorites.name, schema: FavoritesSchema }])],
    controllers: [FavoritesController],
    providers: [FavoritesService],
})
export class FavoritesModule {}
