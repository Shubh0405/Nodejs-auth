module.exports = {
    db: `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_USER_PASSWORD}@${process.env.DATABASE_NAME}/?retryWrites=true&w=majority`
}