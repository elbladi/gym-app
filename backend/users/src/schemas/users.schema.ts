import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { IUser } from "../types";
import { Password } from "src/utils/password";

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
    isOwner: boolean;

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

UserSchema.pre("save", async function (done) {
    if (this.isModified("password")) {
        const hashed = await Password.toHash(this.get("password"));
        this.set("password", hashed);
    }
});
