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

INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('dummy msg 1...', 10);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('dummy msg 2...', 10);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('dummy msg 3...', 10);

SELECT users.id, firstname, lastname, user_id, message_text, user_chat_messages.create_at
FROM user_chat_messages
JOIN users
ON user_chat_messages.user_id = users.id; 

INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 10);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Aenean commodo ligula eget dolor.', 14);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Aenean massa.', 15);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Cum sociis natoque penatibus et magnis.', 124);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Donec quam felis, ultricies nec.', 101);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Nulla consequat massa quis enim.', 34);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Donec pede justo, fringilla vel, aliquet nec.', 23);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.', 89);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Nullam dictum felis eu pede mollis pretium.', 90);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Integer tincidunt. Cras dapibus.', 14);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Vivamus elementum semper nisi.', 130);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Aenean vulputate eleifend tellus.', 150);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.', 170);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.', 76);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum.', 87);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Aenean imperdiet. Etiam ultricies nisi vel augue.', 92);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Curabitur ullamcorper ultricies nisi.', 83);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Nam eget dui. Etiam rhoncus.', 86);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Maecenas tempus, tellus eget condimentum rhoncus.', 34);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Sem quam semper libero, sit amet adipiscing', 91);
INSERT INTO user_chat_messages (message_text, user_id) 
VALUES ('Neque sed ipsum. Nam quam nunc, blandit vel.', 87);

