MERN Agent & Task Manager
Welcome to the MERN Agent & Task Manager project. This is a full stack web application built with the MERN stack to demonstrate how to manage a team of agents and distribute work by uploading a CSV file.

This project serves as a clear example of a modern web application, featuring a React frontend that communicates with a Node.js backend, all powered by a MongoDB database.

What's Inside
This application is packed with essential features:

Secure Admin Login: Only the admin can access the dashboard, using a secure login system with JSON Web Tokens (JWT).

Agent Management: Once logged in, the admin can create new agent accounts.

Simple CSV Upload: The core feature allows the admin to upload a list of tasks in a CSV file.

Smart Task Distribution: The application automatically divides the tasks fairly among all available agents.

Clear Task Overview: The dashboard displays an organized list of which agent is assigned to which tasks.

The Tech We Used
This project is built with the MERN stack, a popular and powerful combination for building web applications:

Frontend: React.js (built with Vite for a fast development experience)

Backend: Node.js & Express.js (for creating the server and API)

Database: MongoDB (using Mongoose to simplify database operations)

Getting Started
Ready to run the application on your own machine? The process is straightforward.

What you will need:
Node.js: Make sure this is installed on your computer.

MongoDB Atlas: You will need a free cloud database account to store your data.

1. Set Up the Backend
First, let's get the server running.

Open a terminal and head into the backend folder: cd backend

Install all the necessary packages: npm install

Create a file named .env in the backend folder. This is where you will put your secret keys. Add these two lines to it, filling in your own details:

MONGO_URI=your_mongodb_connection_string_goes_here
JWT_SECRET=make_up_any_random_secret_string_here

2. Set Up the Frontend
Now for the part you will see in the browser.

Open a new terminal and go into the frontend folder: cd frontend

Install its packages: npm install

How to Run the App
To get the application working, you need to have both the backend and frontend servers running at the same time.

Start the Backend Server: In your first terminal (the one in the backend folder), run:

node index.js

Your API is now live at http://localhost:5000.

Start the Frontend Server: In your second terminal (the one in the frontend folder), run:

npm run dev

Your application is now running and ready to use at http://localhost:5173.

Default Admin Login
To get into the dashboard, use these credentials:

Email: admin@example.com

Password: password123

And that's it! You are all set. Feel free to explore the code and see how it all works together.
