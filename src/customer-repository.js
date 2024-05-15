async function createCustomerTable(client) {
    const sql = "CREATE TABLE IF NOT EXISTS customers (id INT NOT NULL, name VARCHAR(255) NOT NULL, PRIMARY KEY (id))";
    await client.query(sql);
}

async function createCustomer(client, customer) {
    const sql = "INSERT INTO customers (id, name) VALUES($1, $2)";
    await client.query(sql, [customer.id, customer.name]);
}

async function getCustomers(client) {
    const sql = "SELECT * FROM customers";
    const result = await client.query(sql);
    return result.rows;
}

async function getCustomerById(client, customer) {
    const sql = "SELECT * FROM customers WHERE id=$1";
    const result = await client.query(sql, [customer.id]);
    return result.rows;
}




module.exports = { createCustomerTable, createCustomer, getCustomers, getCustomerById}