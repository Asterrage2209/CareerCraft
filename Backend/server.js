const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require('path');

dotenv.config();
const app = express();

const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI)
.then(() => {
    console.log("Connected to MongoDB Atlas");
})
.catch((error) => {
    console.error("MongoDB connection error:", error);
    process.exit(1);
});

const userRoutes = require("./routes/user.routes");
const consultancyRoutes = require("./routes/consultancy.routes");

app.use("/api/auth", userRoutes);
app.use("/api/consultancy", consultancyRoutes);

app.get("/api/health", (req, res) => {
    res.json({ message: "CareerCraft API is running!", status: "healthy" });
});

app.use(express.static(path.join(__dirname, '../Frontend/dist')));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../Frontend/dist/index.html'));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});