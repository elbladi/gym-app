import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Favorites } from "../schemas/favorites.schema";

@Injectable()
export class FavoritesService {
    constructor(@InjectModel(Favorites.name) private favModel: Model<Favorites>) {}
    validateId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id);
    }
}
