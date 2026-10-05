const express = require("express");
const mongoose = require("mongoose");
const cors =require("cors");
require("dotenv").config();
const authRoutes = require("./routes/AuthRoutes");
const catageryRoutes=require("./routes/CatageryRoutes")


const app = express();
app.use(express.json());
const PORT = 4000;


app.use(cors({origin:"http://localhost:5174"}))
  mongoose.connect("mongodb://localhost:27017/plastic")
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((error) => {
    console.log("MongoDB not connected");
    console.log(error);
  });


app.get("/", (req, res) => {
  res.send("Backend is running");
});

app.use("/api", authRoutes);
app.use("/api",catageryRoutes)


app.listen(PORT, () => {
  console.log("Server is connected");
  console.log(`http://localhost:${PORT}`);
});