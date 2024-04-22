# BookMart Admin Panel

The BookMart Admin Panel is a web application designed to manage the operations of BookMart, a bookstore. This application provides functionalities for managing book inventory, user profiles, and access controls with both authenticated and guest access.

## Features

- **User Authentication**: Users can create an account or log in using their email and password. Guests can also log in without an account to browse available books.
- **JWT Authentication**: Secure JWT tokens are issued upon login to authenticate further HTTP requests.
- **Book Inventory Management**:
  - **View Books**: Both registered users and guests can view all the books in the inventory.
  - **Add Books**: Registered users can add new books to the inventory.
  - **Update Books**: Registered users can modify details of existing books.
  - **Delete Books**: Registered users can remove books from the inventory.
- **User Profile Management**:
  - Registered users can update their profile information except for their email address, which is used as a username for login.
  - Guests cannot update profile information.

## Technology Stack

- **Frontend**: React.js, created using Create React App.
- **State Management**: Redux Toolkit.
- **Styling**: Styled Components
- **Backend**: Node.js with Express.js.
- **Database**: MongoDB.
- **Authentication**: JSON Web Tokens (JWT).
