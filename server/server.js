const express = require("express");
const app = express();
const server = require("http").Server(app);
const io = require("socket.io")(server, {
    allowRequest: (req, callback) =>
        callback(null, req.headers.referer.startsWith("http://localhost:3000")),
});
const compression = require("compression");
const path = require("path");
const cookieSession = require("cookie-session");

const csurf = require("csurf");
const cryptoRandomString = require("crypto-random-string");
// const cron = require("node-cron");
const multer = require("multer");
const uidSafe = require("uid-safe");
const db = require("../database.js");
const { hash, compare } = require("../password.js");
const ses = require("../ses.js");
const s3 = require("../s3.js");
const { s3Url } = require("../config.json");

let secret;
process.env.NODE_ENV === "production"
    ? (secret = process.env)
    : (secret = require("../secrets.json"));

//cron job to remove old pwd resets from DB
//todo: dont use it for heroku. use heroku scheduler instead.
//cron.schedule("0 0 */1 * * *", () => {
//    console.log("Clean up the DB.");
//    db.removeOldPWDResets();
//});

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

const diskStorage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function (req, file, callback) {
        uidSafe(24).then(function (uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    },
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152,
    },
});

app.use(
    express.json({
        extended: false,
    })
);

const cookieSessionMiddleware = cookieSession({
    secret: `${secret}`,
    maxAge: 1000 * 60 * 60 * 24 * 7 * 6,
});

app.use(cookieSessionMiddleware);

io.use((socket, next) => {
    cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(csurf());

app.use(function (req, res, next) {
    console.log("token", req.csrfToken);
    res.cookie("mytoken", req.csrfToken());
    next();
});

// socket.io -------------------------------------------------------------------->
io.on("connection", async (socket) => {
    if (!socket.request.session.userId) {
        return socket.disconnect(true);
    }
    console.log("Socket id now connected: ", socket.id);
    const userId = socket.request.session.userId;
    //console.log("UID: ", userId);

    const lastMessages = await db.getMostRecentChatmessages();
    //console.log("lastMessages ", lastMessages.rows);
    socket.emit("chatMessages", lastMessages.rows);

    // React on messages
    socket.on("newMessage", async (message_text) => {
        //console.log(message_text);
        // Save to databse
        const result = await db.addNewChatmessage(userId, message_text);
        const message_id = result.rows[0].id;
        // Send messages to all connected browsers

        const user = await db.getUserProfile(userId);
        const message = {
            ...user.rows[0],
            message_id,
            message_text,
        };

        io.emit("chatMessage", [message]);
    });
});

// socket.io <--------------------------------------------------------------------

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

app.get("/user/profile", (req, res) => {
    db.getUserProfile(req.session.userId)
        .then((results) => {
            console.log(req.session.userId, results.rows[0]);
            //removed password_hash from query
            //delete results.rows[0].password_hash;
            //console.log(results.rows[0]);
            res.json(results.rows[0]);
        })
        .catch((error) => {
            console.log("error in /profile - getUserProfile", error);
            res.json({ error: true });
        });
});

app.post(
    "/user/profile/upload",
    uploader.single("image"),
    s3.upload,
    (req, res) => {
        if (req.file) {
            const url = `${s3Url}${req.file.filename}`;
            db.editProfilePic(req.session.userId, url)
                .then(() => {
                    res.json({ sucess: true, url: url });
                })
                .catch((error) => {
                    console.log("error editProfilePic: ", error);
                    res.json({ error: true });
                });
        } else {
            res.json({ error: true });
        }
    }
);

app.post("/user/profile/shortbio", (req, res) => {
    console.log("POST /user/profile/shortbio", req.body);
    const { draftBio } = req.body;
    db.editProfileBio(req.session.userId, draftBio)
        .then(() => {
            res.json({
                success: true,
                bio: draftBio,
            });
        })
        .catch((error) => {
            console.log("error in shortbio", error);
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

app.get("/api/user", (req, res) => {
    db.getUserProfile(req.session.userId)
        .then(({ rows }) => {
            res.json(rows[0]);
        })
        .catch((error) => {
            console.log("error GET /api/user", error);
            res.json({ error: true });
        });
});

app.get("/api/user/latest", (req, res) => {
    db.getUsers()
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((error) => {
            console.log("/api/user/latest error: ", error);
            res.json({ error: true });
        });
});

app.get("/api/user/:id", (req, res) => {
    const { id } = req.params;
    console.log("request made", id);
    db.getUserProfile(id)
        .then(({ rows }) => {
            rows[0]["loggedId"] = req.session.userId;
            console.log(rows[0]);
            res.json(rows[0]);
        })
        .catch((error) => {
            console.log("error getUserProfile:", error);
            res.json({ error: true });
        });
});

app.get("/api/user/search/:query", (req, res) => {
    console.log(req.params.query);
    db.getMatchingPeople(req.params.query)
        .then(({ rows }) => {
            res.json(rows);
        })
        .catch((error) => {
            console.log("user search error:", error);
            res.json({ error: true });
        });
});

// request part -------------------------------------------------------------------->
const STATUS_NO_REQUEST = "no-request";
const STATUS_REQUEST_MADE_BY_YOU = "request-made-by-you";
const STATUS_REQUEST_MADE_TO_YOU = "request-made-to-you";
const STATUS_ACCEPTED = "request-accepted";

app.get("/api/requests/friends/:userIdOther", async (req, res) => {
    const userId = req.session.userId;
    const { id } = req.params;

    const result = await db.getRequestStatus(userId, id);
    const friendRequest = result.rows.length > 0 ? result.rows[0] : false;

    if (!friendRequest) {
        // Friend request not found
        res.json({ status: STATUS_NO_REQUEST });
    } else if (friendRequest.accepted == true) {
        // Friend request accepted
        res.json({ status: STATUS_ACCEPTED });
    } else if (friendRequest.from_id == userId) {
        // Friend request not accepted, and made by user
        res.json({ status: STATUS_REQUEST_MADE_BY_YOU });
    } else {
        // Friend request not accepted, and made by other user
        res.json({ status: STATUS_REQUEST_MADE_TO_YOU });
    }
});

const ACTION_MAKE_REQUEST = "make-request";
const ACTION_CANCEL_REQUEST = "cancel";
const ACTION_ACCEPT_REQUEST = "accept";
const ACTION_UNFRIEND = "unfriend";

app.post("/api/requests/friends/:action/:userIdOther", async (req, res) => {
    const userId = req.session.userId;
    const { userIdOther, action } = req.params;

    switch (action) {
        case ACTION_MAKE_REQUEST:
            await db.requestMake(userId, userIdOther);
            res.json({ newStatus: STATUS_REQUEST_MADE_BY_YOU });
            break;

        case ACTION_CANCEL_REQUEST:
            await db.requestCancel(userId, userIdOther);
            res.json({ newStatus: STATUS_NO_REQUEST });
            break;

        case ACTION_ACCEPT_REQUEST:
            await db.RequestAccepted(userId, userIdOther);
            res.json({ newStatus: STATUS_ACCEPTED });
            break;

        case ACTION_UNFRIEND:
            await db.requestCancel(userId, userIdOther);
            res.json({ newStatus: STATUS_NO_REQUEST });
            break;
        default:
            res.status(400).json({ error: "Action not recognized." });
    }
});
// request part <--------------------------------------------------------------------

app.get("/api/wannabes", async (req, res) => {
    const userID = req.session.userId;
    const result = await db.getReqestsWannabes(userID);
    res.json(result.rows);
});

// private msg part ---------------------------------------------------------------->
app.get("/api/user/messages/:id", (req, res) => {
    const userId = req.session.userId;
    //console.log(userId);
    const { id } = req.params;
    //console.log(id);
    db.getPrivateChat(userId, id)
        .then(({ rows }) => {
            for (let i in rows) {
                rows[i].time = rows[i].created_at.toLocaleString();
            }
            const result = {
                success: rows.sort((a, b) => {
                    return a.id - b.id;
                }),
            };
            res.json(result);
        })
        .catch((err) => {
            console.log("private messages error: ", err);
            res.json({ error: true });
        });
});

app.post("/api/user/message", (req, res) => {
    const userId = req.session.userId;
    const { otherId, message_text } = req.body;
    db.addPrivateMessage(userId, otherId, message_text)
        .then(({ rows }) => {
            db.getNewPrivateMessage(rows[0].id)
                .then(({ rows }) => {
                    const newMessage = rows[0];
                    newMessage.time = newMessage.created_at.toLocaleString();
                    res.json({ success: newMessage });
                })
                .catch((err) => console.log("Get new message error: ", err));
        })
        .catch((err) => {
            console.log("Send private message error: ", err);
            res.json({ error: true });
        });
});
// private msg part <----------------------------------------------------------------

// add UserAnswers part ------------------------------------------------------------>

app.post("/api/surveys/user/add/anwer", (req, res) => {
    const userId = req.session.userId;
    console.log("survey UID ", userId);
    let survey_id = 2;
    console.log("survey id", survey_id);
    console.log(req.body);
    const answer_values = req.body.answer_values;
    console.log("answer_values", answer_values);

    //get shit done.
    console.log("POST /api/surveys/user/add/anwer", req.body);
    db.addSurveyUserAnwers(userId, survey_id, answer_values)
        .then(() => {
            res.json({
                success: true,
            });
        })
        .catch((error) => {
            console.log("error POST anwersUser ", error);
            res.json({ error: true });
        });
});
// add UserAnswers part <------------------------------------------------------------

app.get("*", function (req, res) {
    if (!req.session.userId) {
        res.redirect("/welcome");
    } else {
        res.sendFile(path.join(__dirname, "..", "client", "index.html"));
    }
});

server.listen(process.env.PORT || 3001, function () {
    console.log("I'm listening...");
});
