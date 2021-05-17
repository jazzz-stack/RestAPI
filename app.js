require('dotenv').config();
const express = require('express');
const userRouter = require('./api/users/user.router');

const app = express()
app.use(express.json());
// app.get('/api', (req, res) => {
//     res.json({
//         success: 1,
//         message: "This is res api working"
//     })
// })

app.use('/api/users', userRouter);

let port = process.env.APP_PORT || 5000
app.listen(port, () => {
    console.log("server is running on port: " + port);
})