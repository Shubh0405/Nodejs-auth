require('dotenv').config();

module.exports = {
    db: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_USER_PASSWORD}@cluster0.4ijxh.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority`
}