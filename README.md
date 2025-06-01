# PetNest (Backend)- Node.js + Express + MongoDB

This repository contains the backend for my university assignment. The project is built using **Node.js**, **Express**, and **MongoDB**, and includes basic API functionality for learning full-stack development.

> 🧑‍💻 I'm primarily an Android developer, exploring backend development through this project.

---

## 🚀 Tech Stack

- **Node.js** – JavaScript runtime  
- **Express** – Minimalist web framework  
- **MongoDB** – NoSQL database  
- **Mongoose** – ODM for MongoDB  

---

## 📁 Project Structure

```
.
├── models/          # Mongoose schemas and models
├── routes/          # Express route handlers
├── controllers/     # Parsing JSON and communicating with the service layer
├── services/        # Business logic
├── middleware/      # Handling auth and secure endpoints
├── public/          # Serving a static HTML file to upload data
├── utils/           # Some untility methods
├── config/          # DB connection and config
├── app.js           # Main server file
└── package.json     # Project metadata and dependencies
```

---

## ⚙️ Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/Ahsan-Kobir/PetNest
cd PetNest
```

2. **Install dependencies**

```bash
npm install
```

3. **Create a `.env` file** and add your environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=secret123
JWT_EXPIRES_IN=365d
```

4. **Run the server**

```bash
npm start
```

---

## 🌐 Frontend Repository

You can find the frontend part of this project here:  
🔗 [Frontend Repo](https://github.com/niloykhan002/PetNest)

You can find the frontend part of this project here:  
🔗 [Live Link](https://pet-nest.netlify.app/)




---

## 📄 License

This project is created for educational purposes only as part of a university assignment.
