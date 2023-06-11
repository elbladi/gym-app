import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { Favorites } from "../schemas/favorites.schema";
import { GymDto } from "../dto/gym.dto";

@Injectable()
export class FavoritesService {
    constructor(@InjectModel(Favorites.name) private favModel: Model<Favorites>) {}
    validateId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id);
    }

    async toggleUsersFav(userId: string, gym: GymDto): Promise<void> {
        const user = await this.favModel.findOne({ userId });
        if (user !== null) {
            const gymLiked = user.list.find((g) => g.gymId === gym.gymId);
            if (gymLiked) {
                //remove it
                const newList = user.list.filter((g) => g.gymId !== gym.gymId);
                user.list = newList;
                await user.save();
            } else {
                // add it to list
                user.list = [...user.list, gym];
                await user.save();
            }
        }
        // create fav doc & add gym to list
        const newEntry = new this.favModel({ userId, list: [gym] });
        await newEntry.save();
    }

    async getFavsByUserId(userId: string): Promise<GymDto[]> {
        const user = await this.favModel.findOne({ userId });
        if (user === null) return [];
        return user.list;
    }
}
