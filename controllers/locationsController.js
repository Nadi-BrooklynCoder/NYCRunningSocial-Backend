const express = require("express");
const locations = express.Router({ mergeParams: true });

const { getUser } = require('../queries/users');

const {
    getAllLocations,
    getLocation,
    addLocation,
    deleteLocation,
    updateLocation
} = require("../queries/locations");

locations.get("/", async (req, res) => {
    const { user_id } = req.params;
    const locations = await getAllLocations(user_id);

    if (user_id) {
        const user = await getUser(user_id);
        if (user.id) {
            res.status(200).json({ ...user, locations });
        } else {
            res.status(500).json({ error: "User not found" });
        }
    } else {
        res.status(200).json(locations);
    }
});

locations.get("/:id", async (req, res) => {
    const { user_id, id } = req.params;
    const location = await getLocation(id);

    if (location) {
        if (user_id) {
            const user = await getUser(user_id);
            res.json({ ...user, location });
        } else {
            res.json(location);
        }
    } else {
        res.status(404).json({ error: "Location not found" });
    }
});

locations.post("/", async (req, res) => {
    const { user_id } = req.params;
    const location = await addLocation ({ ...req.body, user_id });

    res.status(200).json(location);
});

locations.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const deletedLocation = await deleteLocation(id);

    if (deletedLocation.id) {
        res.status(200).json("Location deleted.");
    } else {
        res.status(404).json({ error: "Location not found" });
    }
});

locations.put("/:id", async (req, res) => {
    const { id, user_id } = req.params;
    const updatedLocation = await updateLocation({ user_id, id, ...req.body });

    if (updatedLocation.id) {
        res.status(200).json(updatedLocation);
    } else {
        res.status(404).json("Location not found");
    }
});

module.exports = locations;





