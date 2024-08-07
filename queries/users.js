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
    };
};

const deleteUser = async (id) => {
    try {
        const deletedUser = await db.one(
            "DELETE FROM users WHERE id=$1 RETURNING *", [id]
        );
        return deletedUser;
    } catch (error) {
        return error;
    };
};

const updateUser = async (id, user) => {
    try {
        const updatedUser = await db.one(
            "UPDATE users SET username=$1, email=$2, password=$3, age=$4, dob=$5, profile_pic=$6, gender=$7 WHERE id=$8 RETURNING *",
            [user.username, user.email, user.password, user.age, user.dob, user.profile_pic, user.gender, id]
        );
        return updatedUser;
    } catch(error) {
        return error;
    };
};

module.exports = {
    getAllUsers,
    getUser, 
    createUser,
    deleteUser,
    updateUser
};