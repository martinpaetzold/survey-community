const aws = require("aws-sdk");

let secrets;
if (process.env.NODE_ENV == "production") {
    secrets = process.env; // in prod the secrets are environment variables
} else {
    secrets = require("./secrets"); // in dev they are in secrets.json which is listed in .gitignore
}

const ses = new aws.SES({
    accessKeyId: secrets.AWS_KEY,
    secretAccessKey: secrets.AWS_SECRET,
    region: "eu-west-1",
});

exports.sendEmail = function () {
    return ses
        .sendEmail({
            Source: "martin <holly.face@spicedling.email>",
            Destination: {
                ToAddresses: ["holly.face@spicedling.email"],
            },
            Message: {
                Body: {
                    Text: {
                        Data: "Yay! This is an E-Mail to test the process.",
                    },
                },
                Subject: {
                    Data: "Mail from the awesome social network",
                },
            },
        })
        .promise()
        .then(() => console.log("yay! sendEmail worked."))
        .catch((err) => console.log(err));
};
