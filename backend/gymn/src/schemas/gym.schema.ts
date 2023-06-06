import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { LocationDto } from "../dto/location.dto";
import { RestrictionsDto } from "../dto/restrictions.dto";
import { ServicesDto } from "../dto/services.dto";
import { HydratedDocument } from "mongoose";

@Schema()
export class Gym {
    @Prop()
    ownerId: string;

    @Prop()
    name: string;

    @Prop()
    precio: number;

    @Prop()
    horario: string;

    @Prop()
    images?: string[];

    @Prop({ type: LocationDto })
    location?: LocationDto;

    @Prop()
    locationDesc?: string;

    @Prop()
    description?: string;

    @Prop({ type: ServicesDto })
    services: ServicesDto;

    @Prop({ type: RestrictionsDto })
    restrictions: RestrictionsDto;
}

export const GymSchema = SchemaFactory.createForClass(Gym);
export type GymDoc = HydratedDocument<Gym>;
