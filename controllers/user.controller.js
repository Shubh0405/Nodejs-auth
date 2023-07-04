const bcryptjs = require("bcryptjs");
const userService = require("../services/user.services");

async function register(req, res, next) {
    const { password } = req.body;
    const salt = await bcryptjs.genSalt(10);

    req.body.password = await bcryptjs.hashSync(password, salt);

    console.log(req.body);
    userService.register(req.body, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    });

};

function login(req, res, next) {
    const { username, password } = req.body;

    userService.login({ username, password }, (error, result) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: result
        })
    })
}

function userProfile(req, res, next) {
    return res.status(200).json({ message: "Authorized User!" })
}

module.exports = {
    register,
    login,
    userProfile
}
