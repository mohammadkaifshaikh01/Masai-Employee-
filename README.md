# Masai Employee Management System

## Overview
The **Masai Employee Management System** is a full-stack web application built using **React.js (Frontend)** and **Node.js with Express.js (Backend)**. It provides a seamless way to manage employee records, including profile details and file uploads, using **MongoDB** as the database.

## Features

### Frontend (React.js + Redux)
- **User Interface:**
    - Developed with **React.js** for an interactive and user-friendly experience.
    - Uses **React Router** for smooth navigation between different views (e.g., Employee List, Add Employee, Edit Employee).
- **State Management:**
    - Utilizes **Redux** for managing the application state efficiently.
- **API Communication:**
    - Uses **Axios** for seamless API interactions.
- **File Uploads & Display:**
    - Allows employees to upload profile pictures.
    - Uses **Cloudinary** for storing and retrieving images.

### Backend (Node.js + Express.js)
- **Database Integration:**
    - Uses **MongoDB** for storing employee records.
    - Implements **Mongoose** for schema modeling and database interactions.
- **File Storage:**
    - Integrates **Cloudinary** for secure image uploads.
    - Uses **Multer** middleware to handle file uploads.
- **Authentication & Authorization:**
    - Implements **JWT-based authentication** to secure API endpoints.
- **RESTful APIs:**
    - Provides CRUD operations (Create, Read, Update, Delete) for employee management.
- **Additional Features:**
    - Supports **pagination** and **search** for efficient employee management.
    - Ensures API security and scalability.

### Database (MongoDB)
- **Schema Design:**
    - Stores employee details including:
      - Name
      - Position
      - Contact Information
      - Profile Picture URL (stored on Cloudinary)

## Deployment
- **Frontend:** Deployed on **Vercel**
- **Backend:** Hosted on **Render/Heroku (if applicable)**
- **Database:** MongoDB Atlas

## Technologies Used
- **Frontend:** React.js, Redux, React Router, Axios, Tailwind CSS (optional for styling)
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, Multer, Cloudinary
- **Deployment:** Vercel, Render, MongoDB Atlas

## Live Demo & Repository
- **GitHub Repository:** [Masai Employee Management System](https://github.com/mohammadkaifshaikh01/Masai-Employee-)
- **Live Demo:** [Masai Employee Management System](https://masai-employee-psi.vercel.app/)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js
- MongoDB

### Backend Setup
1. Clone the repository:
   ```sh
   git clone https://github.com/mohammadkaifshaikh01/Masai-Employee-.git
   cd Masai-Employee/backend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Create a `.env` file and add the following:
   ```env
   MONGO_URI=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   JWT_SECRET=your_jwt_secret
   ```
4. Start the backend server:
   ```sh
   npm run dev
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```sh
   cd ../frontend
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the React app:
   ```sh
   npm start
   ```

## Contributing
Feel free to contribute to this project by submitting issues and pull requests!

## License
This project is licensed under the **MIT License**.

---

