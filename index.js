const express = require("express");
const mongoose = require("mongoose");
const dbConfig = require("./config/db.config");

const auth = require("./middleware/auth.middleware");
const errors = require("./middleware/errors.middleware");

const { unless } = require("express-unless");
const userRouter = require("./routes/user.routes");

require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;
console.log(dbConfig.db);
console.log(process.env.DATABASE_USER);
mongoose.connect(dbConfig.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(
    () => {
        console.log("Database Connected");
    },
    (error) => {
        console.log("Database can't be connected: " + error);
    }
);

auth.authenticateToken.unless = unless;
app.use(
    auth.authenticateToken.unless({
        path: [
            { url: "/users/login", methods: ["POST"] },
            { url: "/users/register", methods: ["POST"] }
        ]
    })
)

app.use(express.json());

app.use("/users", userRouter);

app.use(errors.errorHandler);

app.listen(process.env.PORT || 4000, function () {
    console.log("Ready to Go!")
});