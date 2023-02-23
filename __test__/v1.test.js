"use strict";

const { server } = require("../src/server");
const { db } = require("../src/models");
const supertest = require("supertest");
const request = supertest(server);

beforeAll(async () => {
  await db.sync();
});

afterAll(async () => {
  await db.drop();
});

descirbe("v1 routes ", ()=>{

  it("create a record", async()=>{
    let response = await request.post("api/v1/food").send({
      name:"taco",
      calories:500,
      type:"portein"
    });

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual("taco");


  });

  it("get all records", async()=>{
    let response = await request.post("api/v1/food").get({
      name:"taco",
      calories:500,
      type:"portein"
    });

    expect(response.status).toEqual(201);
    expect(response.body[0].name).toEqual("taco");

  });

  it("create a record", async()=>{
    let response = await request.get("api/v1/food/1");

    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual("taco");
  });
});