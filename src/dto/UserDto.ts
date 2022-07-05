import { IUser } from "../schemas/UserSchema";

export class UserDto {
    id: string;
    avatar: string;
    name: string;
    email: string;
    isAdmin: boolean;
    block: boolean;

    constructor(user: IUser) {
        this.id = user._id;
        this.avatar = user.avatar;
        this.name = user.name;
        this.email = user.email;
        this.isAdmin = user.isAdmin;
        this.block = user.block;
    }
}
