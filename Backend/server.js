const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

port = process.env.PORT || 5000;
app.use(cors())
app.use(express.json());


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});