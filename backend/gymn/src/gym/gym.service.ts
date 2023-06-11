import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import mongoose, { Model } from "mongoose";
import { NewGymDto } from "../dto/new.gym.dto";
import { NewGymResponse } from "../responses/gym.resp";
import { Gym, GymDoc } from "../schemas/gym.schema";
import { UpdateGymDto } from "../dto/update.gym.dto";
import { GetGymDto } from "../dto/get.gym.dto";
import { GymsLocation } from "../types";

@Injectable()
export class GymService {
    constructor(@InjectModel(Gym.name) private gymModel: Model<Gym>) {}

    validateId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id);
    }

    async getGymsLocations(): Promise<GymsLocation[]> {
        const gyms = await this.gymModel.find({});
        return gyms.map((gym: GymDoc) => {
            return {
                gymId: gym._id.toHexString(),
                lat: gym.location.lat,
                lon: gym.location.lon,
            };
        });
    }

    async getAllGyms(): Promise<GetGymDto[]> {
        const gyms = await this.gymModel.find({});
        return gyms.map((gym: GymDoc) => {
            return {
                gymId: gym._id.toHexString(),
                name: gym.name,
                precio: gym.precio,
                horario: gym.horario,
                images: gym.images,
                location: gym.location,
                locationDesc: gym.locationDesc,
                services: gym.services,
                description: gym.description,
                restrictions: gym.restrictions,
            };
        });
    }

    async getGymById(gymId: string): Promise<GetGymDto> {
        const found = await this.gymModel.findById(gymId);
        if (found === null) throw new NotFoundException(`Gym ${gymId} not found`);

        return {
            gymId,
            name: found.name,
            precio: found.precio,
            horario: found.horario,
            images: found.images,
            location: found.location,
            locationDesc: found.locationDesc,
            services: found.services,
            description: found.description,
            restrictions: found.restrictions,
        };
    }

    async createGym(data: NewGymDto): Promise<NewGymResponse> {
        if (!this.validateId(data.ownerId)) {
            throw new BadRequestException(`invalid ownerId: ${data.ownerId}`);
        }

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
        if (!this.validateId(data.gymId)) {
            throw new BadRequestException(`invalid gymId: ${data.gymId}`);
        }
        if (!this.validateId(data.ownerId)) {
            throw new BadRequestException(`invalid ownerId: ${data.ownerId}`);
        }

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
