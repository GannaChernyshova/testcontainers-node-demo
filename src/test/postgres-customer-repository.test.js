const { Client } = require("pg");
const { PostgreSqlContainer } = require("@testcontainers/postgresql");
const { createCustomerTable, createCustomer, getCustomers, deleteCustomerById, getCustomerById } = require("../customer-repository");

describe("Customer Repository", () => {
    jest.setTimeout(60000);

    let postgresContainer;
    let postgresClient;

    beforeEach(async () => {
        postgresContainer = await new PostgreSqlContainer("postgres:16-alpine").start();
        postgresClient = new Client({ connectionString: postgresContainer.getConnectionUri() });
        await postgresClient.connect();
        await createCustomerTable(postgresClient)
    });

    afterEach(async () => {
        await postgresClient.end();
        await postgresContainer.stop();
    });

    it("should create and return multiple customers", async () => {
        const customer1 = { id: 1, name: "John Doe" };
        const customer2 = { id: 2, name: "Jane Doe" };

        await createCustomer(postgresClient, customer1);
        await createCustomer(postgresClient, customer2);

        const customers = await getCustomers(postgresClient);
        expect(customers).toEqual([customer1, customer2]);
    });

    it("should get customer by id", async () => {
        const customer1 = { id: 1, name: "John Doe One" };
        const customer2 = { id: 2, name: "Jane Doe Two" };

        await createCustomer(postgresClient, customer1);
        await createCustomer(postgresClient, customer2);

        const customer = await getCustomerById(postgresClient, customer2);
        expect(customer).toEqual([customer2]);

    });
});