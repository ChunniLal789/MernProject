require('dotenv').config();
const express = require('express');
const app = express();
const router = require('./router/auth-router');
const connectDB = require('./utils/db')

app.use(express.json());

app.use('/api/auth', router);

const PORT = process.env.PORT | 5000;

app.get('/', (req, res) => {
    res.status(200).send("Hello this is home page");
})

app.get('/register', (req, res) => {
    res.status(200).send("Hello this is registration page");
})

connectDB().then( () => {
    app.listen(PORT, () => {
        console.log(`server connected to port ${PORT}`);
    })
})