const express = require("express");
const dotenv = require("dotenv");
const { chats } = require("./data/data");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");


const app = express();
dotenv.config();
connectDB();

app.use(express.json()); // telling server to accept json data that we are taking from front end. 

app.get('/', (req, res) => {
    res.send("API is running");
})

app.use('/api/user', userRoutes);    


const PORT = process.env.PORT || 5000;

app.listen(`${PORT}`, console.log(`Server started on PORT ${PORT}`.yellow.bold));