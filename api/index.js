const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const uploadRoute = require("./routes/uploadPdf");

dotenv.config();
app.use(cors());

//
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("connected to db successfully..."))
  .catch((err) => console.log(`Not connected to db due to: ${err}`));

// MIDDLEWARE
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/upload", uploadRoute);

app.listen(8000, () => {
  console.log(`Backend is running at port: ${8000}`);
});
