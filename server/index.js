require('dotenv').config()
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const PORT = process.env.PORT||5000;
const router= require("./router/routes");
const errorMiddleware = require('./middleware/errorMiddleware');

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api',router);
app.use(errorMiddleware);

const start = async () => {
  try {
    await mongoose.connect(process.env.DB_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    app.listen(PORT, () => console.log(`listening on port ${PORT}`));
  } catch (error) {
    console.error(error);
  }
};

start();