import { User } from "../models/user";
import http from 'http'
import { UserService } from "../users-service";
import { checkProps } from "../helpers/checkrequiredProps";
import * as uuidv from 'uuid';

export const updateUser = (res: http.ServerResponse, usersService: UserService, data: [id:string, user: User]) => {
    if (!uuidv.validate(data[0])) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'wrong id'}))
    } else if (!usersService.checkUserById(data[0])) {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'no user with this id'}))
    } else if (!checkProps(data[1])) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'wrong users body'}))
    } else {
        usersService.updateUser(data)
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.end(JSON.stringify(usersService.getUserById(data[0])))
    }
}