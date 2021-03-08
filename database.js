const spicedPG = require("spiced-pg");

//heroku || local
const db = spicedPG(
    process.env.DATABASE_URL ||
        "postgres:martinpaetzold:@localhost:5432/socialnetwork"
);

module.exports.addUserToDB = (firstName, lastName, email, password) => {
    const q = `
    INSERT INTO users (firstname, lastname, email, password_hash) 
    VALUES ($1, $2, $3, $4)
    RETURNING id;
    `;
    const params = [firstName, lastName, email, password];
    return db.query(q, params);
};

//get user(id) by e-mail
module.exports.getUserByEmail = (emailAddress) => {
    return db.query("SELECT * FROM users WHERE email=$1;", [emailAddress]);
};
