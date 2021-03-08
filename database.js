const spicedPG = require("spiced-pg");

//heroku || local
const db = spicedPG(
    process.env.DATABASE_URL ||
        "postgres:martinpaetzold:@localhost:5432/socialnetwork"
);

exports.addUserToDB = (firstName, lastName, email, password) => {
    const q = `
    INSERT INTO users (firstname, lastname, email, password_hash) 
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `;
    const params = [firstName, lastName, email, password];
    return db.query(q, params);
};

exports.getUserInfo = (userEmail) => {
    const q = `
        SELECT id, email, password_hash
        FROM users
        WHERE email = $1
        RETURNING password_hash;
        `;
    const params = [userEmail];
    return db.query(q, params);
};

exports.getUserByEmail = (email) => {
    return db.query("SELECT * FROM users WHERE email=$1;", [email]);
};

exports.addPWDResetcode = (email, code) => {
    const q = `
    INSERT INTO user_reset_pwd (email, reset_code) 
    VALUES ($1, $2);
    `;
    const params = [email, code];
    return db.query(q, params);
};

exports.getCodeFromDB = (email) => {
    const q = `
        SELECT *
        FROM user_reset_pwd
        WHERE email = $1 AND CURRENT_TIMESTAMP - created_ts < INTERVAL '10 minutes'
        ORDER BY created_ts DESC
        LIMIT 1;
        `;
    const params = [email];
    return db.query(q, params);
};

exports.addNewPWDToDB = (email, password) => {
    const q = `
        UPDATE users 
        SET password_hash=$2
        WHERE email=$1;
        `;
    const params = [email, password];
    return db.query(q, params);
};
