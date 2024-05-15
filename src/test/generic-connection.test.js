const redis = require("async-redis");
const { GenericContainer } = require("testcontainers");
const axios = require('axios');

describe("Generic Container example", () => {
  let container;

  beforeAll(async () => {
    container = await new GenericContainer("kennethreitz/httpbin:latest")
      .withExposedPorts(80)
      .start();
  });

  afterAll(async () => {
    await container.stop();
  });

  it("shoud it work?", async () => {
    const response = await axios.get('http://localhost:80/uuid');
    expect(response.status).toEqual(200);
  });

  it("it works", async () => {
    const containerPort = container.getMappedPort(80);
    const containerHost = container.getHost();
    baseUrl = `http://${containerHost}:${containerPort}`;
    console.log(baseUrl)
    const response = await axios.get(baseUrl + '/uuid');
    expect(response.status).toEqual(200);
  });


  


  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

});