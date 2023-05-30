import { Injectable } from "@nestjs/common";
import { UserDto, UserEditableDto } from "./dto/user.dto";
import { User } from "./schemas/users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(user: UserDto): Promise<User> {
        const newUser = new this.userModel(user);
        await newUser.save();
        return newUser;
    }

    async deleteAll(): Promise<void> {
        await this.userModel.deleteMany({
            name: "Bladimir",
        });
        return;
    }

    async getAll() {
        return await this.userModel.find();
    }
}
