import { Injectable } from "@nestjs/common";
import { UserDto, UserEditableDto } from "./dto/user.dto";

type DB = {
    [id: string]: UserDto | UserEditableDto;
};

let db: DB = {
    admin: {
        name: "a",
        lastNames: "a",
        email: "",
        password: "",
    },
};

@Injectable()
export class UserService {
    createUser(user: UserDto) {
        db = { ...db, user };
    }
}
