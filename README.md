# Todo App with React and Redux

A full-stack todo application with user authentication built using React, Redux, and Express.js.

## Features

- User authentication and authorization
- Create, read, update, and delete todo items
- Responsive design with Bootstrap and Font Awesome
- State management with Redux

## Technology Stack

### Frontend
- React.js
- Redux for state management
- React Router for navigation
- Bootstrap for styling
- Webpack for bundling
- Axios for API requests

### Backend
- Node.js with Express
- MongoDB with Mongoose ODM
- RESTful API architecture
- JWT for authentication

## Project Structure

The project is organized into:
- `/frontend` - React/Redux client
- `/backend` - Express.js server

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
   ```
   git clone https://github.com/RobertoDure/toDo-App-react-redux.git
   cd toDo-App-react-redux
   ```

2. Install backend dependencies
   ```
   cd backend
   npm install
   ```

3. Install frontend dependencies
   ```
   cd ../frontend
   npm install
   ```

### Running the Application

#### Development Mode

1. Start the backend server
   ```
   cd backend
   npm run dev
   ```

2. Start the frontend development server
   ```
   cd frontend
   npm run dev
   ```

3. Open your browser and navigate to the local development server (typically http://localhost:8080)

#### Production Mode

1. Build the frontend
   ```
   cd frontend
   npm run production
   ```

2. Start the backend in production mode
   ```
   cd backend
   npm run production
   ```

## License

This project is licensed under the ISC License
