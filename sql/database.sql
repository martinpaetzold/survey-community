DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS user_reset_pwd;
DROP TABLE IF EXISTS user_profiles;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    lastname VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(300) NOT NULL,
    created_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_reset_pwd (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    reset_code VARCHAR(255) NOT NULL,
    created_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) UNIQUE,
    profile_picture_url VARCHAR(255) NOT NULL
);