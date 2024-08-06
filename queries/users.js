const db = require("../db/dbConfig");

const getAllUsers = async () => {
    try {
        const allUsers = await db.any("SELECT * FROM users");
        return allUsers;
    } catch (error) {
        return error;
    };
};

const getUser = async (id) => {
    try {
        const oneUser = await db.one("SELECT * FROM users WHERE id=$1", id);
        return oneUser;
    } catch (error) {
        return error;
    };
};

const createUser = async (user) => {
    try {
        const newUser = await db.one(
            "INSERT INTO users (username, email, password, age, dob, profile_pic, is_active, gender) VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *", [user.username, user.email, user.password, user.age, user.dob, user.profile_pic, user.is_active, user.gender]
        );
        return newUser
    } catch(error) {
        return error;
    }
}

module.exports = {
    getAllUsers,
    getUser, 
    createUser
};