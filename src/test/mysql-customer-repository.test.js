const { MySqlContainer } = require("@testcontainers/mysql");
const mysql = require('mysql2/promise'); 

const { createCustomerTable, createCustomer, getCustomers, getCustomerById } = require("../customer-repository");

describe("Customer Repository", () => {
    jest.setTimeout(60000);

    let mysqlContainer;
    let mysqlClient;

    beforeAll(async () => {
        mysqlContainer = await new MySqlContainer().start();
        mysqlClient = await mysql.createConnection({
            host: mysqlContainer.getHost(),
            port: mysqlContainer.getPort(),
            database: mysqlContainer.getDatabase(),
            user: mysqlContainer.getUsername(),
            password: mysqlContainer.getUserPassword(),
          });

        await createCustomerTable(mysqlClient)
    });

    afterAll(async () => {
        await mysqlClient.end();
        await mysqlContainer.stop();
    });

    it("should create and return multiple customers MYSQL", async () => {
        const customer1 = { id: 1, name: "John Doe" };
        const customer2 = { id: 2, name: "Jane Doe" };

        const sql = "INSERT INTO customers (id, name) VALUES(?, ?)";
        await mysqlClient.query(sql, [customer1.id, customer1.name]);
        await mysqlClient.query(sql, [customer2.id, customer2.name]);

        const selectSql = "SELECT * FROM customers";
        const [rows] = await mysqlClient.query(selectSql);  

        expect(rows).toEqual([customer1, customer2]);
    });
});