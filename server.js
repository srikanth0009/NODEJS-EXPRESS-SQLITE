const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const PORT = 8080;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Router
const tutorialRouter = require("./app/routers/tutorials.router");
app.use("/api/tutorials", tutorialRouter);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
