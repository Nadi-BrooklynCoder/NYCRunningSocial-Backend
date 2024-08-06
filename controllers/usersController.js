const express = require("express");
const users = express.Router();

const locationsController = require('./locationsController');

users.use('/:user_id/locations', locationsController);

const {
    getAllUsers,
    getUser
} = require("../queries/users");

users.get("/", async (req, res) => {
    const allUsers = await getAllUsers();
    
    if(allUsers[0]) {
        res.status(200).json(allUsers);
    } else {
        res.status(500).json({ error: "server error" });
    };
});

users.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await getUser(id);

    if(user) {
        res.json(user)
    } else {
        res.status(404).json({ error: "not found" });
    };
});

module.exports = users;