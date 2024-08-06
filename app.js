const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
    res.send("Welcome to the NYCRunningSocial database.");
});

const usersController = require("./controllers/usersController");
const locationsController = require("./controllers/locationsController");

app.use("/users", usersController);
app.use("/locations", locationsController);

app.get("*", (req, res) => {
    res.status(404).send("Wrong Direction");
});

module.exports = app;

