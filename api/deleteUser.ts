import http from 'http'
import { UserService } from "../users-service";
import * as uuidv from 'uuid';

export const deleteUser = (res: http.ServerResponse, usersService: UserService, id: string) => {
    if (!uuidv.validate(id)) {
        res.writeHead(400, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'wrong id'}))
    } else if (!usersService.checkUserById(id)) {
        res.writeHead(404, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'no user with this id'}))
    } else if (usersService.checkUserById(id)) {
        usersService.deleteUser(id)
        res.writeHead(204, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'user deleted'}))
    }

}