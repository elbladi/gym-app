import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { GymDto } from "src/dto/gym.dto";
import { HydratedDocument } from "mongoose";

@Schema()
export class Favorites {
    @Prop()
    userId: string;

    @Prop({ type: GymDto })
    list: GymDto[];
}
export const FavoritesSchema = SchemaFactory.createForClass(Favorites);
export type FavoritesDoc = HydratedDocument<Favorites>;
