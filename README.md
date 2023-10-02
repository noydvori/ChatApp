# chatApp
Welcome to our cross-platform chat application! This application allows users to chat in real-time across various platforms. We've developed an efficient server using Node.js with the Express framework, and we utilize MongoDB as the database to store and retrieve data. The client-side was built using React, and real-time communication is achieved through Socket.IO.

Getting Started
Before running the application, make sure you have the necessary dependencies installed. You can do this by running:

bash
Copy code
npm install
Environment Variables
The application uses environment variables to configure essential settings. There are two .env files provided:

For the Client
Create a .env file in the root folder containing the following variable:

plaintext
Copy code
REACT_APP_SERVER_URL=<SERVER_URL>
Replace <SERVER_URL> with the URL where the server is hosted.

For the Server
Create a .env.local file in the ./webServer/config folder with the following variables:

plaintext
Copy code
MONGODB_CONNECTION_STRING=<MONGODB_CONNECTION_STRING>
PORT=<PORT_NUMBER>
Replace <MONGODB_CONNECTION_STRING> with the MongoDB connection string and <PORT_NUMBER> with the desired port number for the server.

Running the Application
To start the application, run the following command:

bash
Copy code
npm start
This command loads the environment variables from the .env.local file to the server, ensuring the correct configuration.

Contributors
This project was developed by Ronnie and Noy (EX2).

Thank you for using our web chatting app! If you have any issues or questions, please don't hesitate to reach out. Happy chatting!
