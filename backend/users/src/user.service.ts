import { BadRequestException, Injectable } from "@nestjs/common";
import { UserDto, UserEditableDto } from "./dto/user.dto";
import { User } from "./schemas/users.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { UserResponse } from "./responses/userResponse.res";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    validateId(id: string) {
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            return;
        } else throw new BadRequestException(`invalid ID: ${id}`);
    }

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
        this.validateId(id);
        const resp = await this.userModel.findById(id);
        return resp !== null;
    }

    async getUser(id: string): Promise<UserResponse> {
        this.validateId(id);
        const user = await this.userModel.findById(id);
        const { name, lastNames, email, birthday, username, notifications, messages } = user;
        return { name, lastNames, email, birthday, private: user.private, username, notifications, messages };
    }

    async updateUser(id: string, data: UserEditableDto): Promise<void> {
        this.validateId(id);
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
        await this.userModel.deleteMany({});
        return;
    }

    async getAll() {
        return await this.userModel.find();
    }
}
