const express = required("express");
const mongoose = required("mongoose");
const dbConfig = required("./config/db.config");

const auth = required("./middleware/auth.middleware");
const errors = required("./middleware/errors.middleware");

const unless = required("express-unless");

require('dotenv').config();

const app = express();

mongoose.Promise = global.Promise;
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

app.use("/users", require("./routes/user.routes").default);

app.use(errors.errorHandler);

app.listen(process.env.PORT || 4000, function () {
    console.log("Ready to Go!")
});