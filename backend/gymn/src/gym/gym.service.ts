import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { NewGymDto } from "../dto/new.gym.dto";
import { NewGymResponse } from "../responses/gym.resp";
import { Gym } from "../schemas/gym.schema";
import { UpdateGymDto } from "../dto/update.gym.dto";

@Injectable()
export class GymService {
    constructor(@InjectModel(Gym.name) private gymModel: Model<Gym>) {}

    async createGym(data: NewGymDto): Promise<NewGymResponse> {
        const newGym = new this.gymModel(data);
        await newGym.save();

        const { ownerId, name, precio, horario, images, location, locationDesc, description, services, restrictions } =
            newGym;

        return {
            ownerId,
            gymId: newGym._id.toHexString(),
            name,
            precio,
            horario,
            images,
            location,
            locationDesc,
            description,
            services,
            restrictions,
        };
    }

    async updateGym(data: UpdateGymDto) {
        // validate gym exist
        const found = await this.gymModel.findById(data.gymId);
        if (found === null) throw new NotFoundException(`Gym ${data.gymId} not found`);

        // validate owner is the same
        if (found.ownerId !== data.ownerId)
            throw new UnauthorizedException(`Gym owner ${data.ownerId} is not authorized to modify gym ${data.gymId}`);

        // update by properties
        if (data.name) found.name = data.name;
        if (data.precio) found.precio = data.precio;
        if (data.horario) found.horario = data.horario;
        if (data.images) found.images = data.images;
        if (data.location) found.location = data.location;
        if (data.locationDesc) found.locationDesc = data.locationDesc;
        if (data.description) found.description = data.description;
        if (data.services) found.services = data.services;
        if (data.restrictions) found.restrictions = data.restrictions;

        await found.save();
    }
}
