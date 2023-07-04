const User = require("../models/user.model");
const bcypt = require("bcryptjs");
const auth = require("../middleware/auth.middleware");

async function login({ username, password }, callback) {

    const user = await User.findOne({ username: username });

    if (user != null) {
        if (bcypt.compareSync(password, user.password)) {
            const token = auth.generateAccessToken(username);
            return callback(null, { ...user.toJSON(), token });
        } else {
            return callback({
                message: "Invalid Password!",
            });
        }
    } else {
        return callback({
            message: "Username doesn't exists!"
        });
    }
}

async function register(params, callback) {

    if (params.username === undefined) {
        return callback({ message: "Username Required!" });
    }

    console.log(params);

    const user = new User(params);

    console.log(user);

    user.save()
        .then((response) => {
            return callback(null, response);
        })
        .catch((error) => {
            return callback(error);
        })

}

module.exports = {
    login,
    register
}
