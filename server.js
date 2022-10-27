require("dotenv").config({ path: "./config.env" });
const express = require("express");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error.middleware");

connectDB();

const app = express();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/private", require("./routes/privateData.routes"));

//Error handler
app.use(errorHandler);

const server = app.listen(PORT, () => {
  console.log("client on port 5000");
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`logged error: ${err}`);
  server.close(() => {
    process.exit(1);
  });
});
