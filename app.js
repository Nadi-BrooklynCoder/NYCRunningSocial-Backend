const cors = require("cors");
const express = require("express");
const morgan = require("morgan")

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

app.get("/", (req, res) => {
    res.send("Welcome to the NYCRunningSocial database.");
});

const usersController = require("./controllers/usersController");

app.use("/users", usersController);

app.get("*", (req, res) => {
    res.status(404).send("Wrong Direction");
});

module.exports = app;