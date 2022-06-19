import server from "..";
import request from "supertest";
import * as uuidv from 'uuid';
import { User } from "../models/user";

describe('api', () => {
  
  test("get users", async () => {
    const res = await request(server).get("/api/users");
    expect(res.status).toEqual(200);
  });

  test("not correct url", async () => {
    const res = await request(server).get("/api/userscsfsf");
    expect(res.status).toEqual(404);
  });

  test("get empry", async () => {
    const res = await request(server).get("/api/users");
    expect(res.body).toEqual([]);
  });

  test("not correct id", async () => {
    const id = uuidv.v4()
    const res = await request(server).get(`/api/users/${id}`);
    expect(res.status).toEqual(404);
    expect(JSON.parse(res.text)).toEqual({message: 'no user with this id'});
  });

  test("post user", async () => {

    const res = await request(server).post(`/api/users`)
    .send({
      username: 'Zhenya',
      hobbies: ['RS'],
      age: 27
    })

    expect(res.status).toEqual(201);
    expect(res.body[0].username).toBe('Zhenya')
    expect(res.body[0].age).toBe(27)
    expect(res.body[0].hobbies).toEqual(['RS'])
  });

  test("put user", async () => {
    const id = uuidv.v4()
    const res = await request(server).put(`/api/users/${id}`)
    .send({
      username: 'Zhenya',
      hobbies: ['RS'],
      age: 27
    })

    expect(res.status).toEqual(404);
  })

  test("delete user", async () => {
    const id = uuidv.v4()
    const res = await request(server).delete(`/api/users/${id}`)
    .send({
      username: 'Zhenya',
      hobbies: ['RS'],
      age: 27
    })

    expect(res.status).toEqual(404);
  })

  

});
