const express = require("express");
const users = express.Router();

const locationsController = require('./locationsController');

users.use('/:user_id/locations', locationsController);

const {
    getAllUsers,
    getUser,
    createUser,
    deleteUser,
    updateUser
} = require("../queries/users");

users.get("/", async (req, res) => {
    console.log(req.body);
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
    console.log(req.body)
    try {
        const user = await createUser(req.body);
        res.json(user);
    } catch(error) {
        res.status(400).json({ error: error });
    };
});

users.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedUser = await deleteUser(id);
  
    if (deletedUser) {
      res.status(200).json("User deleted");
    } else {
      res.status(404).json("User not found");
    }
  });
  

users.put("/:id", async (req, res) => {
    const { id } = req.params;
    const updatedUser = await updateUser(id, req.body);
    
    res.status(200).json(updatedUser);
});

module.exports = users;