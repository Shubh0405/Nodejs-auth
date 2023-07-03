const jwt = required("jwt");

function authenticateToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })

}

function generateAccessToken(username) {
    return jwt.sign({ data: username }, process.env.JWT_SECRET_KEY, {
        expireIn: "1h"
    });
}

module.exports = {
    authenticateToken,
    generateAccessToken
}