DROP DATABASE IF EXISTS nycrunningsocial_dev;
CREATE DATABASE nycrunningsocial_dev;

\c nycrunningsocial_dev;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255),
    age INT,
    dob DATE,
    profile_pic TEXT,
    is_active BOOLEAN DEFAULT TRUE,
    gender VARCHAR(10)
);

DROP TABLE IF EXISTS locations CASCADE;

CREATE TABLE locations (
    id SERIAL PRIMARY KEY,
    location VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    user_id INTEGER REFERENCES users (id)
    ON DELETE CASCADE
);


DROP TABLE IF EXISTS paths CASCADE;

CREATE TABLE paths (
    id SERIAL PRIMARY KEY, 
    name VARCHAR(100),
    directions TEXT,
    miles INT,
    location_id INTEGER REFERENCES locations (id)
    ON DELETE CASCADE
);

DROP TABLE IF EXISTS path_types CASCADE;

CREATE TABLE path_types (
    difficulty TEXT,
    path_id INTEGER REFERENCES paths (id)
    ON DELETE CASCADE
);

DROP TABLE IF EXISTS running_groups CASCADE;

CREATE TABLE running_groups (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    location_id INTEGER REFERENCES locations (id)
    ON DELETE CASCADE
);

DROP TABLE IF EXISTS user_running_groups CASCADE;
 
CREATE TABLE user_running_groups (
    user_id INTEGER REFERENCES users (id),
    running_groups_id  INTEGER REFERENCES running_groups (id)
    ON DELETE CASCADE
);
