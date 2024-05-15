# Testcontainers Node Demo

This repository demonstrates the use of Testcontainers with Node.js for integration testing. Testcontainers is a library that provides throwaway, lightweight instances of databases, message brokers, web browsers, or just about anything that can run in a Docker container.

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Node.js (v12 or later)](https://nodejs.org/)
- [Docker (ensure the Docker daemon is running)](https://www.docker.com/products/docker-desktop/) or [Testcontainers Cloud](https://app.testcontainers.cloud/)
- [Git](https://git-scm.com/)

### Detailed Description of Tests

The tests are located in the `src/test` directory and include:

1. **[generic-connection.test.js](https://github.com/GannaChernyshova/testcontainers-node-demo/blob/main/src/test/generic-connection.test.js)**:
    - Tests the initialization and connection to a generic container.
    - Demonstrates the use of the `GenericContainer` class for running basic container operations.

2. **[wait-container.test.js](https://github.com/GannaChernyshova/testcontainers-node-demo/blob/main/src/test/wait-container.test.js)**:
    - Tests various wait strategies to ensure containers are ready before running tests.
    - Demonstrates the use of waiting mechanisms like `forLogMessage` and `forListeningPorts`.

3. **[network-connection.test.js](https://github.com/GannaChernyshova/testcontainers-node-demo/blob/main/src/test/network-connection.test.js)**:
    - Demonstrates how to set up a custom network and ensure communication between containers.

4. **[postgres-customer-repository.test.js](https://github.com/GannaChernyshova/testcontainers-node-demo/blob/main/src/test/postgres-customer-repository.test.js)**:
    - Demonstrates the use of the [`PostgreSqlContainer`](https://node.testcontainers.org/modules/postgresql/) module for database interactions.

5. **[mysql-customer-repository.test.js](https://github.com/GannaChernyshova/testcontainers-node-demo/blob/main/src/test/mysql-customer-repository.test.js)**:
    - Demonstrates the use of the [`MySQLContainer`](https://node.testcontainers.org/modules/mysql/) module for database interactions.

6. **[selenium.test.js](https://github.com/GannaChernyshova/testcontainers-node-demo/blob/main/src/test/selenium.test.js)**:
    - Demonstrates the use of the [`SeleniumContainer`](https://node.testcontainers.org/modules/selenium/) module for web testing.

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:
    ```sh
    git clone https://github.com/GannaChernyshova/testcontainers-node-demo.git
    cd testcontainers-node-demo
    ```

2. **Install dependencies**:
    ```sh
    npm install
    ```

## Running Tests

To run all tests or a single test using Jest, use the following commands:

1. **Run all tests**:
    ```sh
    npm test
    ```

2. **Run a single test**:
    ```sh
    npx jest src/test/generic-connection.test.js
    ```

This will execute the specified test file using Jest.

## Useful Links

- [Testcontainers for Node.js](https://github.com/testcontainers/testcontainers-node)
- [Testcontainers Best Practices](https://www.docker.com/blog/testcontainers-best-practices/)
