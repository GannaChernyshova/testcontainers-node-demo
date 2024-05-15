const { GenericContainer, Wait } = require("testcontainers");
const redis = require("async-redis");


describe("Wait startegy example", () => {

  it("redis wait for port", async () => {
    const container = await new GenericContainer("redis")
    .withExposedPorts(6379)
    .withWaitStrategy(Wait.forListeningPorts())
    .start();

    const redisClient = redis.createClient(
      container.getMappedPort(6379),
      container.getHost(),
    );

    await redisClient.set("key", "val");
    expect(await redisClient.get("key")).toBe("val");

    await redisClient.quit();
    await container.stop();
  });


  it("redis wait for log", async () => {
    const container = await new GenericContainer("redis")
    .withExposedPorts(6379)
    .withWaitStrategy(Wait.forLogMessage("Ready to accept connections tcp"))
    .start();

    const redisClient = redis.createClient(
      container.getMappedPort(6379),
      container.getHost(),
    );

    await redisClient.set("key 2", "val 2");
    expect(await redisClient.get("key 2")).toBe("val 2");

    await redisClient.quit();
    await container.stop();
  });

  it("redis wait for all", async () => {
    const container = await new GenericContainer("redis")
    .withExposedPorts(6379)
    .withWaitStrategy(Wait.forAll([Wait.forListeningPorts(), Wait.forLogMessage("Ready to accept connections tcp")]))
    .start();

    const redisClient = redis.createClient(
      container.getMappedPort(6379),
      container.getHost(),
    );

    await redisClient.set("key 3", "val 3");
    expect(await redisClient.get("key 3")).toBe("val 3");

    await redisClient.quit();
    await container.stop();
  });
  
});