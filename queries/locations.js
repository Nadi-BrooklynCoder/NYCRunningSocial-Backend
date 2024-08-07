const db = require("../db/dbConfig");

const getAllLocations = async (userId) => {
    try {
        let allLocations;
        if (userId) {
            allLocations = await db.any("SELECT * FROM locations WHERE user_id=$1", [userId]);
        } else {
            allLocations = await db.any("SELECT * FROM locations");
        }
        return allLocations;
    } catch (error) {
        return error;
    }
};

const getLocation = async (id) => {
    try {
        const oneLocation = await db.one("SELECT * FROM locations WHERE id=$1", [id]);
        return oneLocation;
    } catch (error) {
        return error;
    }
};

const addLocation = async (location) => {
    try {
        let newLocation;
        if (location.user_id) {
            newLocation = await db.one(
                "INSERT INTO locations (location, address, user_id) VALUES ($1, $2, $3) RETURNING *",
                [location.location, location.address, location.user_id]
            );
        } else {
            newLocation = await db.one(
                "INSERT INTO locations (location, address) VALUES ($1, $2) RETURNING *",
                [location.location, location.address]
            );
        }
        return newLocation;
    } catch (error) {
        return error;
    }
};


const deleteLocation = async (id) => {
    try {
        const deletedLocation = await db.one(
            "DELETE FROM locations WHERE id=$1 RETURNING *",
            [id]
        );
        return deletedLocation;
    } catch (error) {
        return error;
    }
};

const updateLocation = async (location) => {
    try {
        let updatedLocation;
        if (location.user_id) {
            updatedLocation = await db.one(
                "UPDATE locations SET location=$1, address=$2, user_id=$3 WHERE id=$4 RETURNING *",
                [location.location, location.address, location.user_id, location.id]
            );
        } else {
            updatedLocation = await db.one(
                "UPDATE locations SET location=$1, address=$2 WHERE id=$3 RETURNING *",
                [location.location, location.address, location.id]
            );
        }
        return updatedLocation;
    } catch (error) {
        return error;
    }
};


module.exports = {
    getAllLocations,
    getLocation,
    addLocation,
    deleteLocation,
    updateLocation
};
