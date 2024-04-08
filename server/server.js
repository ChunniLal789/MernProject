const express = require('express');
const app = express();

const PORT = process.env.PORT | 5000;

app.get('/', (req, res) => {
    res.status(200).send("Hello this is home page");
})

app.get('/register', (req, res) => {
    res.status(200).send("Hello this is registration page");
})

app.listen(PORT, () => {
    console.log(`server connected to port ${PORT}`);
})