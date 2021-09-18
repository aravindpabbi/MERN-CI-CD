require('dotenv').config()
const mongoose = require('mongoose');
const express = require("express");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");


const app = express();
//DBconnection
mongoose.connect(process.env.DATABASE,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  }
).then(() => {
  console.log("DATABASE CONNECTED")
});

//Middlewares
app.use(bodyparser.json());
app.use(cookieparser());
app.use(cors());

//MyRoutes
app.use("/api", authRoutes)

app.use("/api", userRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)
app.use("/api", orderRoutes)

//Port
const port = process.env.PORT || 7000;

app.listen(port, () => {
  console.log(`app is runnning at ${port}`);
})