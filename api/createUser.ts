import { User } from "../models/user";
import http from 'http'
import { UserService } from "../users-service";
import { checkProps } from "../helpers/checkrequiredProps";

export const createUser = (res: http.ServerResponse, usersService: UserService, data: User) => {
    if (checkProps(data)) {
        usersService.createUser(data)
        res.writeHead(201, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(usersService.getUsers()))
    } else {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'wrong users body'}))
    }
}