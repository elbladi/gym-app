import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NewGymDto } from "src/dto/new.gym.dto";
import { Gym } from "src/schemas/gym.schema";

@Injectable()
export class GymService {
    constructor(@InjectModel(Gym.name) private gymModel: Model<Gym>) {}

    async createGym(data: NewGymDto) {
        const newGym = new this.gymModel(data);
        await newGym.save();
    }
}
