# CC Repository - Destinology (Team CH2-PS397)

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

## Models

### Itinerary Planner

The Itinerary Planner is an innovative feature of our API, designed to simplify and enhance the travel planning experience. It offers users the ability to create their travel itineraries with ease. This planner not only assists in organizing trips but also includes functionality for automatic itinerary generation based on user preferences such as city, duration, and price. The Itinerary Planner is an indispensable tool for travelers seeking a hassle-free and personalized way to plan their journeys.

### Endpoints

- **'/models/itinerary'**
  Automatically generate a travel itinerary based on user preferences.

- **'/models/itinerary-generate'**
  Regenerating parts of a travel itinerary that do not align with the user's preferences

### Landmark Prediction

Landmark Prediction is an advanced feature of our API that leverages image recognition to identify and provide detailed information about landmarks. This tool is designed for users who wish to learn more about specific landmarks or explore their surroundings through images. By analyzing input from the user, it offers insightful and accurate information about various landmarks, enhancing the user's understanding and experience of different cultural and historical sites.

### Endpoints

- **'/models/landmark'**
  Predict and provide details about landmarks in images or descriptions.

## Others

- **'/auth/logout'**
  Deleting the user's session token

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

1.  Create a VM Instance with the exact specification above
2.  Create a firewall to enable tcp in port:8000
3.  Run this code

```
! sudo apt update
```

```
! sudo apt install git
```

```
! sudo apt-get install python3-pip
```

```
! git clone https://github.com/dhiyarisalah/destinology.git
```

```
! cd destinology
```

```
! pip3 install -r requirements.txt
```

4. Create/Run Session Manager

```
! tmux new -s session
```

```
! tmux attach
```

5. After that run this code to start the server

```
! python3 main-api.py
```

6. Or this code to keep the program running

```
! nohup python3 main-api.py &
```

Thank you :)

# Other Path Repository

### [Machine Learning](https://github.com/diga-tech/Destinology_ML)

### [Mobile Development](https://github.com/rizfirsy-gh/destinology-app)
