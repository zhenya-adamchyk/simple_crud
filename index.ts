import http from 'http';
import cluster from 'cluster';
import * as dotenv from 'dotenv';
import { handleFunctin } from './handle';
import { UserService } from './users-service';
import { isPathHaveId } from './helpers/isApiForUsersWithId';
import { getUsers } from './api/getUsers';
import { createUser } from './api/createUser';
import { getUser } from './api/getUser';
import { getId } from './helpers/getId';
import { updateUser } from './api/updateUser';
import { deleteUser } from './api/deleteUser';
import os from 'os';

const userService = new UserService()
const cpuLength = os.cpus().length
const PORT = process.env.PORT || 4000;
let server
const isMulti = !!process.argv.slice(2).find(prop => prop === '--multi')
const listenServer = () => {
    server = http.createServer((req: any, res: http.ServerResponse) => {
        if (req.url === '/api/users' && req.method === 'GET') {
            handleFunctin(getUsers, res, userService)
        } else if (isPathHaveId(req) && req.method === 'GET') {
            handleFunctin(getUser, res, userService, getId(req))
        } else if (req.url === '/api/users' && req.method === 'POST') {
            req.on('data', (data: any) => {
                handleFunctin(createUser, res, userService, JSON.parse(data.toString()))
            })
        } else if (isPathHaveId(req) && req.method === 'PUT') {
            req.on('data', (data: any) => {
                handleFunctin(updateUser, res, userService, [getId(req), JSON.parse(data.toString())])
            })
        } else if (isPathHaveId(req) && req.method === 'DELETE') {
            handleFunctin(deleteUser, res, userService, getId(req))
        } else {
            res.writeHead(404, {'Content-Type': 'application/json'})
            res.end(JSON.stringify({message: 'cant find page'}))
        }
    }).listen(PORT, () => console.log('server started'))
}

dotenv.config();

if (isMulti) {
    if (cluster.isPrimary) {
        for (let i = 0; i < cpuLength; i++) {
            cluster.fork();
        }
    } else {
        const id = cluster.worker?.id;
        console.log(`Worker: ${id}, pid: ${process.pid}, prot: ${PORT}`)
        listenServer();
    }
} else {
    listenServer();
}

export default server
