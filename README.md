# ArteFacto Backend Service 1

Member of Cloud Computing
| Member | Student ID | University |
|:------:|:----------:|:----------:|
| Afif Wahyu Adhitya | C183B4KY0154 | Universitas Amikom Yogyakarta |
| Muhammad Askar Habibulloh | C548B4NY2750 | UIN Sunan Kalijaga Yogyakarta |

## About Our API

This API is built using **REST API** to ensure flexibility and scalability in data management. We implement JWT (JSON Web Token) as the main authentication system to ensure the security and reliability of authorization. With the token-based method, this API enables fast and efficient user validation for each request.

## User Authentication

A key component of our authentication process is the implementation of JWT (JSON Web Token) for secure management of user authorizations and sessions. This process is designed to securely handle user credentials using password hashing before they are saved to the database. This authentication system is powered by MySQL, which stores user data in a structured manner, ensuring security and high performance for application needs. The following are the details of the user data stored in the MySQL database:

User Data

- Time created (number): Records the timestamp when the user account was created.
- Email (string): Stores the user's email address.
- Username (string): Contains the name of the selected user.
- Full name (string): Stores the full name of the user.

### Endpoints

- **'/auth/register'**
  Register a new user with email and password, storing user Cloud SQL.

- **'/auth/login'**
  Authenticate an existing user, providing access via token-based session management.

## User Data Management

User Data Management is a crucial part of our API, designed to give users full control over their personal data. The system allows users to securely make various updates, including changing their username, changing their email address, and updating their password. With privacy and security in mind, this module ensures every data management process is carried out with a high level of confidentiality, creating a trusted environment for users to maintain and control their information.

### Endpoints

- **'/auth/profile'**
  Retrieve the current user's profile information.

- **'/auth/changeName'**
  Update the current user's name.

- **'/auth/changeEmail'**
  Update the current user's email address.

- **'/users/changePassword'**
  Update the current user's password.

### Others

- **'/auth/logout'**
  Deleting the user's session token

## Online Ticket Purchase for Users

Online ticket purchase is our API program for ticket purchase feature. This system makes it easy for users to purchase tickets online by selecting available temples and making cashless payments, but for payment methods we currently only have QRIS available and only use dummy data. 

### Endpoints

- **'/tickets'**
  View all available tickets on the temple list.
  
- **'/tickets/{ticketId}'**
  View the ticket details available for the selected temple.

- **'/transactions'**
  User fills in the transaction details according to the temple visited.

- **'/transactions'**
  User gets all purchased ticket transactions

- **'/transactions/{transactionId}'**
  User gets all ticket transactions based on the ticket temple purchased.

## Ticket owned by The User

Online ticket purchase is our API program for ticket purchase feature. This system makes it easy for users to purchase tickets online by selecting available temples and making cashless payments, but for payment methods we currently only have QRIS available and only use dummy data. 

### Endpoints

- **'/ownedTickets'**
  view all ticket lists owned by the user according to the ticket purchased.
  
- **'/ownedTickets/{transactionId}'**
  View the ticket details owned by the user according to the ticket purchased based on the transaction.

## Deployment

**are deployed on Google Cloud Platform Compute Engine.**
Here is the detailed specification of the compute engine used for deployment.

|     Item     |   Specification    |
| :----------: | :----------------: |
|     Type     |      Instance      |
|     Zone     | asia-southeast2-a  |
| Machine type |     e2-medium      |
| CPU Platform |  Intel Broadwell   |
| Architecture |       x86/64       |
|  Boot Disk   | debian-11-bullseye |

## Run the API in GCP Compute Engine

To set up the environment required by the APIs and AI-Model that will be deployed, follow this step.

