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
    id_profiles SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) UNIQUE,
    profile_picture_url VARCHAR(255) NOT NULL
);

-- Test JOIN
SELECT * FROM users
FULL OUTER JOIN user_profiles
ON user_profiles.user_id = users.id
WHERE id=10;

-- Test INSERT
INSERT INTO user_profiles
            (user_id, profile_picture_url)
        VALUES
            (10, 'http://www.mpaetzold.de')
        ON CONFLICT (user_id) DO
            UPDATE
                SET profile_picture_url='http://www.mpaetzold.de/test.jpg'
        WHERE user_profiles.user_id=10;