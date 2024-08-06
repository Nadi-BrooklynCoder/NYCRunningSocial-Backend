const db = require("../db/dbConfig");

const getAllLocations = async (userId) => {
    try {
        let allLocations;
        if(userId) {
            allLocations = await db.any("SELECT * FROM locations WHERE user_id=$1", [userId]);
        } else {
            allLocations = await db.any("SELECT * FROM locations");
        }
        return allLocations;
    } catch (error) {
        return error;
    };
};

const getLocation = async (id) => {
    try {
        const oneLocation = await db.one("SELECT * FROM locations WHERE id=$1", [id]);
        return oneLocation;
    } catch (error) {
        return error;
    };
};

const addLocation = async (location, address, userId) => {
    try {
        const newLocation = await db.one(
            "INSERT INTO locations (location, address, user_id) VALUES ($1, $2, $3) RETURNING *",
            [location, address, userId]
        );
        return newLocation;
    } catch(error) {
        return error;
    };
};

module.exports = {
    getAllLocations,
    getLocation, 
    addLocation
}