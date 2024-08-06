const db = require("../db/dbConfig");

const getAllLocations = async (user_id) => {
    try {
        const allLocations = await db.any("SELECT * FROM locations WHERE user_id=$1", user_id);
        return allLocations;
    } catch (error) {
        return error;
    };
};

const getLocation = async (id) => {
    try {
        const oneLocation = await db.one("SELECT * FROM locations WHERE id=$1", id);
        return oneLocation;
    } catch (error) {
        return error;
    }
}

module.exports = {
    getAllLocations,
    getLocation
}