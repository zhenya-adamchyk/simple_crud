import http from 'http'
import { UserService } from "../users-service";

export const getUsers = (res: http.ServerResponse, usersService: UserService) => {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(usersService.getUsers()))
}