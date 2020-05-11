module.exports = {
    PORT: process.env.PORT || 5000,
    MONGOURI: "mongodb+srv://guneyral:guneyguney@guneyural-boaqq.mongodb.net/test?retryWrites=true&w=majority",
    SECRET: 'SHHHHH',
    DEFAULT_PROFILE_PICTURE: "uploads/1589234862373nopic.png",
    TRANSPORTER: {
        service: 'gmail',
        auth: {
            user: 'ihtiyarbebe497@gmail.com',
            pass: 'myPassword1'
        }
    }
};