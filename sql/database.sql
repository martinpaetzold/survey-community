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
    profile_picture_url VARCHAR(255)
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

-- Part V
CREATE TABLE user_profiles (
    id_profiles SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) UNIQUE,
    profile_picture_url VARCHAR(255),
    short_bio VARCHAR(255)
);

ALTER TABLE user_profiles ADD COLUMN short_bio VARCHAR(255);

-- PART VII
DROP TABLE IF EXISTS user_requests;

CREATE TABLE user_requests (
    id_requests SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    receiver_id INT REFERENCES users(id) NOT NULL,
    accepted BOOLEAN DEFAULT false,
    created_ts TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PART X
DROP TABLE IF EXISTS user_chat_messages;

CREATE TABLE user_chat_messages (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    message_text VARCHAR(255) NOT NULL CHECK (message_text != ''),
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PART private msgs
DROP TABLE IF EXISTS user_private_messages;

CREATE TABLE user_private_messages (
    id SERIAL PRIMARY KEY,
    sender_id INT REFERENCES users(id) NOT NULL,
    receiver_id INT REFERENCES users(id) NOT NULL,
    message_text VARCHAR(255) NOT NULL CHECK (message_text != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PART Surveys / survey details
DROP TABLE IF EXISTS surveys;

CREATE TABLE surveys (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL CHECK (title != ''),
    description VARCHAR(255) NOT NULL CHECK (title != ''),
    picture_url VARCHAR(255) NOT NULL CHECK (title != ''),
    number_questions INT NOT NULL,
    user_id INT REFERENCES users(id) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PART Surveys / questions
DROP TABLE IF EXISTS survey_questions;

CREATE TABLE survey_questions (
    id SERIAL PRIMARY KEY,
    survey_id INT REFERENCES surveys(id) NOT NULL,
    type VARCHAR(255) NOT NULL CHECK (type != ''),
    answer_number VARCHAR(255) NOT NULL CHECK (answer_number != ''),
    question_picture_url VARCHAR(255) NOT NULL CHECK (question_picture_url != ''),
    title VARCHAR(255) NOT NULL CHECK (title != ''),
    isReq VARCHAR(255) NOT NULL CHECK (isReq != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PART Surveys / answers
DROP TABLE IF EXISTS survey_answers;

CREATE TABLE survey_answers (
    id SERIAL PRIMARY KEY,
    survey_id INT REFERENCES surveys(id) NOT NULL,
    question_id INT REFERENCES survey_questions(id) NOT NULL,
    answer VARCHAR(255) NOT NULL CHECK (answer != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PART Surveys / user answers
DROP TABLE IF EXISTS survey_user_anwers;

CREATE TABLE survey_user_anwers (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id) NOT NULL,
    survey_id INT REFERENCES surveys(id) NOT NULL,
    answer_values VARCHAR(255) NOT NULL CHECK (answer_value != ''),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

