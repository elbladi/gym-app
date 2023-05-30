import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IUser } from "../types";

@Schema()
export class User implements IUser {
    @Prop()
    name: string;

    @Prop()
    lastNames: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    birthday?: number;

    @Prop()
    private?: boolean;

    @Prop()
    username?: string;

    @Prop()
    notifications?: boolean;

    @Prop()
    messages?: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = HydratedDocument<User>;
