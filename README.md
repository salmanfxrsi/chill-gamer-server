# Chill Gamer - Server-Side

This repository contains the server-side code for the **Chill Gamer** application. It handles database operations, authentication, and other backend logic.

### Live Site
[Live Site](https://chill-gamer-server-one.vercel.app/)

### Features:
- **Database Management**: MongoDB is used to store game reviews, user data, and watch list information.
- **User Authentication**: Handles login and registration, ensuring that only logged-in users can access protected routes such as adding reviews and viewing the watch list.
- **Review Management**: Allows users to submit, update, and delete reviews. Each review is tied to a user.
- **WatchList Management**: Users can add or remove games from their watch list.
- **Search and Sorting**: Allows filtering and sorting of reviews based on rating, year, and genres.

### Technologies Used:
- **Node.js**: Backend framework for handling requests and server logic.
- **Express.js**: Web framework to create RESTful APIs.
- **MongoDB**: NoSQL database for storing game reviews and user data.
- **JWT (JSON Web Token)**: For authenticating API requests and protecting routes.
- **Cors**: Middleware to handle cross-origin requests.
