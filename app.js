const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

const balanceRoutes = require("./routes/balance");

const app = express();

dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("MongoDB connected..."));

mongoose.connection.on("error", err => {
  console.log(`DB COnnection error: ${err.message}`);
});

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

app.use("/", balanceRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server Started on port ${port}...`);
});
