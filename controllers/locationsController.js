const express = require("express");

const locations = express.Router( { mergeParams: true } );

const { getUser } = require ('../queries/users');

const {
    getAllLocations,
    getLocation
} = require("../queries/locations");

locations.get("/", async (req, res) => {
    const { user_id } = req.params;
    const locations = await getAllLocations(user_id);
    const user = await getUser(user_id);

    if(user.id) {
        res.status(200).json({ ...user, locations })
    } else {
        res.status(500).json( { error: "User not found" });
    };
});

locations.get("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    const location = await getLocation(id);
    const user = await getUser(user_id)

    if(location) {
        res.json({ ...user, location});
    } else {
        res.status(404).json({ error: "Location not found" });
    };
});

module.exports = locations;