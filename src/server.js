const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./config/db");
const cors = require("cors")
const bodyParser = require("body-parser")
const userRoutes = require("./routes/userRoutes")
const employeeRoutes = require("./routes/employeeRoutes")
const taskRoutes = require("./routes/taskRoutes")

connectDB();


// Middleware

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

// admin 
app.use("/api/",userRoutes)


// Employee
app.use("/api/employee",employeeRoutes)

// Task
app.use("/api/task",taskRoutes)

const PORT = 3000;

app.listen(PORT, () => {
  console.log("Server is running on PORT ", PORT);
});
