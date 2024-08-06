const express = require("express");
const users = express.Router();

const locationsController = require('./locationsController');

users.use('/:user_id/locations', locationsController);

const {
    getAllUsers,
    getUser,
    createUser
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

users.post("/", async (req, res) => {
    try {
        const user = await createUser(req.body);
        res.json(user);
    } catch(error) {
        res.status(400).json({ error: error });
    };
});

module.exports = users;