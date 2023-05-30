import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDto, UserEditableDto } from "./dto/user.dto";
import { User } from "./schemas/users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async createUser(user: UserDto): Promise<string> {
        const newUser = new this.userModel(user);
        await newUser.save();
        return newUser._id.toString();
    }

    async userExist(email: string): Promise<boolean> {
        const resp = await this.userModel.findOne({ email });
        return resp !== null;
    }
    async userExistById(id: string): Promise<boolean> {
        const resp = await this.userModel.findById(id);
        return resp !== null;
    }

    async updateUser(id: string, data: UserEditableDto): Promise<void> {
        const user = await this.userModel.findById(id);
        const { name, lastNames, birthday, username, notifications, messages } = data;
        try {
            name && (user.name = name);
            lastNames && (user.lastNames = lastNames);
            birthday && (user.birthday = birthday);
            username && (user.username = username);
            notifications && (user.notifications = notifications);
            messages && (user.messages = messages);
        } catch (error) {
            throw new BadRequestException("Problem updating user, validate user data types");
        }
        await user.save();
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
