
# Artefacto Backend Service 2

## Project Overview

This is the second service for the ArteFacto project, its a backend application built using Node.js and the Hapi.js framework. It serves as an API for fetching data about temples and their associated artifacts, enabling users to retrieve information about temples and artifacts via HTTP endpoints. 

## Features

- Retrieve a list of temples.
- Retrieve a list of artifacts associated with a temple.


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/ArteFacto-id/artefacto-cloud-computing.git
   ```

2. Navigate to the project directory:

   ```bash
   cd artefacto-cloud-computing
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and configure the following variables:

   ```env
   PORT=your_server_port
   HOST=your_server_host
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   DB_PORT=your_database_port
   JWT_SECRET=your_jwt_secret
   ```

5. Start the server:

   ```bash
   npm start
   ```

6. Use `nodemon` for development mode:

   ```bash
   npm run dev
   ```

## API Endpoints

### Temples

- **GET /temples**
  - Retrieves a list of all temples.
- **GET /temples/{templeId}/artifacts**
  - Retrieves all artifacts associated with a specific temple.
- **GET /bookmark**
  - Change bookmark status of an artifact.
- **GET /read**
  - Change is_read status of an artifact.

## Dependencies

- **@hapi/hapi**: Hapi.js framework for building the server.
- **@hapi/jwt**: Middleware for handling JWT authentication.
- **dotenv**: Environment variable management.
- **mysql2**: MySQL database driver.

### Dev Dependencies

- **eslint**: Linter for maintaining code quality.
- **nodemon**: Development tool for automatic server restarts.

## License

This project is licensed under the [License.](LICENSE)
