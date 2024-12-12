# ArteFacto Backend Service 1

Member of Cloud Computing
| Member | Student ID | University |
|:------:|:----------:|:----------:|
| Afif Wahyu Adhitya | C183B4KY0154 | Universitas Amikom Yogyakarta |
| Muhammad Askar Habibulloh | C548B4NY2750 | UIN Sunan Kalijaga Yogyakarta |

## About Our API

This API is built using **REST API** to ensure flexibility and scalability in data management. We implement JWT (JSON Web Token) as the main authentication system to ensure the security and reliability of authorization. With the token-based method, this API enables fast and efficient user validation for each request.

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
   npm run start-dev
   ```

## User Authentication

A key component of our authentication process is the implementation of JWT (JSON Web Token) for secure management of user authorizations and sessions. This process is designed to securely handle user credentials using password hashing before they are saved to the database. This authentication system is powered by MySQL, which stores user data in a structured manner, ensuring security and high performance for application needs. The following are the details of the user data stored in the MySQL database:

User Data

- Time created (number): Records the timestamp when the user account was created.
- Email (string): Stores the user's email address.
- Username (string): Contains the name of the selected user.
- Full name (string): Stores the full name of the user.

### Endpoints

- **POST '/auth/register'**
  Register a new user with email and password, storing user Cloud SQL.

- **POST '/auth/login'**
  Authenticate an existing user, providing access via token-based session management.

## User Data Management

User Data Management is a crucial part of our API, designed to give users full control over their personal data. The system allows users to securely make various updates, including changing their username, changing their email address, and updating their password. With privacy and security in mind, this module ensures every data management process is carried out with a high level of confidentiality, creating a trusted environment for users to maintain and control their information.

### Endpoints

- **GET '/auth/profile'**
  Retrieve the current user's profile information.

- ** PUT '/auth/changeName'**
  Update the current user's name.

- **PUT '/auth/changeEmail'**
  Update the current user's email address.

- **PUT '/users/changePassword'**
  Update the current user's password.

### Others

- **'/auth/logout'**
  Deleting the user's session token

## Online Ticket Purchase for Users

Online ticket purchase is our API program for ticket purchase feature. This system makes it easy for users to purchase tickets online by selecting available temples and making cashless payments, but for payment methods we currently only have QRIS available and only use dummy data. 

### Endpoints

- **GET '/tickets'**
  View all available tickets on the temple list.
  
- **GET '/tickets/{ticketId}'**
  View the ticket details available for the selected temple.

- **POST '/transactions'**
  User fills in the transaction details according to the temple visited.

- **GET '/transactions'**
  User gets all purchased ticket transactions

- **GET '/transactions/{transactionId}'**
  User gets all ticket transactions based on the ticket temple purchased.

## Ticket owned by The User

Online ticket purchase is our API program for ticket purchase feature. This system makes it easy for users to purchase tickets online by selecting available temples and making cashless payments, but for payment methods we currently only have QRIS available and only use dummy data. 

### Endpoints

- **GET '/ownedTickets'**
  view all ticket lists owned by the user according to the ticket purchased.
  
- **GET '/ownedTickets/{transactionId}'**
  View the ticket details owned by the user according to the ticket purchased based on the transaction.

## Dependencies

- **@hapi/hapi**: Hapi.js framework for building the server.
- **@hapi/jwt**: Middleware for handling JWT authentication.
- **dotenv**: Environment variable management.
- **bcrypt**: Store user passwords securely
- **mysql2**: MySQL database driver.

### Dev Dependencies

- **eslint**: Linter for maintaining code quality.
- **nodemon**: Development tool for automatic server restarts.

## License

This project is licensed under the [License.](LICENSE)
