const { GenericContainer, Network } = require("testcontainers");

describe("Networking Container example", () => {
    let container;
    let fooContainer;
  
    beforeAll(async () => {
        const network = await new Network().start();

        container = await new GenericContainer("alpine")
            .withCommand(["sleep", "infinity"])
            .withNetwork(network)
            .start();
      
        fooContainer = await new GenericContainer("alpine")
            .withCommand(["sleep", "infinity"])
            .withNetwork(network)
            .withNetworkAliases("foo")
            .start();
    });
  
    afterAll(async () => {
        await container.stop();
        await fooContainer.stop();
    });
  
    it("shoud it work with network", async () => {
        expect((await container.exec(["getent", "hosts", "foo"])).exitCode).toBe(0);
    });

});