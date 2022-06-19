import http from 'http'
import { User } from './models/user'
import { UserService } from './users-service'

export const handleFunctin = (callbak: any, res: http.ServerResponse, users: UserService, data?: unknown) => {
    try {
        callbak(res, users, data)
    } catch (error) {
        res.writeHead(500, {'Content-Type': 'application/json'})
        res.end(JSON.stringify({message: 'cant get users'}))
    }
}