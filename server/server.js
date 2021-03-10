const express = require("express");
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");
const app = express();
const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
const cron = require("node-cron");
const db = require("../database.js");
const { hash, compare } = require("../password.js");
const ses = require("../ses.js");

let secret;
process.env.NODE_ENV === "production"
    ? (secret = process.env)
    : (secret = require("../secrets.json"));

//cron job to remove old pwd resets from DB
//todo: dont use it for heroku. use heroku scheduler instead.
cron.schedule("0 0 */1 * * *", () => {
    console.log("Clean up the DB.");
    db.removeOldPWDResets();
});

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
        db.getUserByEmail(email)
            .then((results) => {
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
            })
            .catch((error) => {
                console.log("getUserByEmail: ", error);
                res.json({ error: true });
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

//just for test sendMail
/*
app.get("/send-test-mail", (req, res) => {
    ses.sendEmail("holly.face@spicedling.email", "Message TEST", "Subject TEST")
        .then(() => {
            console.log("sendMail successful.");
            res.json({ error: false });
        })
        .catch((error) => {
            console.log("error sendMail: ", error);
            res.json({ error: true });
        });
});
*/

app.post("/user/reset-password/start", (req, res) => {
    const { email } = req.body;
    //let email = "holly.face@spicedling.email";
    db.getUserByEmail(email)
        .then(({ rows }) => {
            if (rows.length > 0) {
                const resetCode = cryptoRandomString({
                    length: 8,
                });
                console.log(email);
                console.log(resetCode);
                db.addPWDResetcode(email, resetCode)
                    .then(() => {
                        var subj = "Social Network Password Reset";
                        var msg = "your resetcode:" + resetCode;
                        ses.sendEmail(email, msg, subj)
                            .then(() => {
                                res.json({ success: true, error: false });
                            })
                            .catch((error) => {
                                console.log("error in sendEmail", error);
                                res.json({ error: true });
                            });
                    })
                    .catch((error) => {
                        console.log("error in addCode", error);
                        res.json({ error: true });
                    });
            } else {
                res.json({ error: true });
            }
        })
        .catch((error) => {
            console.log("error in getUserEmail", error);
            res.json({ error: true });
        });
});

app.post("/user/reset-password/add-new", (req, res) => {
    console.log(req.body);
    const { email, resetCode, password } = req.body;
    db.getCodeFromDB(email)
        .then(({ rows }) => {
            console.log(rows);
            if (resetCode === rows[0].reset_code) {
                console.log("code/email exists");
                hash(password).then((hashedPw) => {
                    db.addNewPWDToDB(email, hashedPw)
                        .then(({ rows }) => {
                            console.log("editPassword worked", rows);
                            res.json({ success: true });
                        })
                        .catch((error) => {
                            console.log("error in editPassword", error);
                            res.json({ error: true });
                        });
                });
            } else {
                console.log("code doesn't match");
                res.json({ error: true });
            }
        })
        .catch((error) => {
            console.log("error in getCode: ", error);
            res.json({ error: true });
        });
});

app.get("/logout", (req, res) => {
    //checkLoginStatus
    if (!req.session.userId) {
        return res.redirect(302, "/login");
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
