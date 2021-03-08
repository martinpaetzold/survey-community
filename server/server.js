const express = require("express");
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const app = express();
const csurf = require("csurf");
const db = require("../database.js");
const { hash, compare } = require("../password.js");

let secret;
process.env.NODE_ENV === "production"
    ? (secret = process.env)
    : (secret = require("../secrets.json"));

app.use(
    express.json({
        extended: false,
    })
);

app.use(
    cookieSession({
        secret: `${secret}`,
        maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
    })
);

app.use(csurf());

app.use(function (req, res, next) {
    console.log("token", req.csrfToken);
    res.cookie("mytoken", req.csrfToken());
    next();
});

app.use(compression());

app.use(express.static(path.join(__dirname, "..", "client", "public")));

app.get("/welcome", (req, res) => {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.post("/login", (req, res) => {
    // 1.check if user fill out fields
    const { email, password } = req.body;
    if (!email || !password) {
        res.json({ error: true });
    } else {
        // 2.load user with this email address from db
        //react to not existing user
        db.getUserByEmail(email).then((results) => {
            if (results.rows.length == 0) {
                //NO user found with this email address
                res.json({ error: "Email and password not correct.." });
            }
            // 3.compare passwords
            const user = results.rows[0];
            compare(password, user.password_hash).then((valid) => {
                if (!valid) {
                    res.json({ error: "Email and password not correct." });
                }
                // 4.write user info to session
                console.log("Login successful.");
                // req.session.user = user;
                console.log("req.session.userId");
                req.session.userId = user.id;
                res.json({ error: false, login: true });
            });
        });
    }
});

app.post("/registration", (req, res) => {
    const { first, last, email, password } = req.body;
    hash(password)
        .then((hashedPw) => {
            db.addUserToDB(first, last, email, hashedPw)
                .then(({ rows }) => {
                    console.log("addUser successful: ", rows);
                    req.session.userId = rows[0].id;
                    res.json({ error: false });
                })
                .catch((error) => {
                    console.log("error addUserToDB: ", error);
                    res.json({ error: true });
                });
        })
        .catch((error) => {
            console.log("error during hash: ", error);
        });
});

app.get("/logout", (req, res) => {
    //checkLoginStatus
    if (!req.session.userId) {
        return res.redirect(302, "/register");
    }

    req.session = null;
    res.redirect("/");
});

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

app.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening...");
});
