import { User } from "./models/user";
import * as uuidv from 'uuid';

export class UserService  {
    users: User[] = []
    constructor() {}

    getUsers(): User[] {
        return this.users
    }

    createUser(user: User): void {
        const userObj = user;
        userObj.id = uuidv.v4()
        this.users.push(userObj)
    }

    checkUserById(id: string): boolean {
        return !!this.users.find((el: User) => el.id === id);
    }

    getUserById(id: string) {
        return this.users.find((el: User) => el.id === id);
    }

    updateUser(data: [id:string, user: User]): void {
        const newUser = data[1]
        newUser.id = data[0]
        this.users = this.users.filter(user => user.id !== data[0])
        this.users.push(data[1])
    }

    deleteUser(id: string): void {
        this.users = this.users.filter(user => user.id !== id)
    }


}