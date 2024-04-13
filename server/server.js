require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const authRoute = require('./router/auth-router');
const contactRoute = require('./router/contact-router');
const serviceRoute = require('./router/service-router');
const connectDB = require('./utils/db')

const corsOptions = {
    origin : "http://127.0.0.1:5173",
    methods : "GET, POST, PUT, DELETE, PATCH, HEAD",
    credentials : true,
}

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRoute);
app.use('/api/form', contactRoute);
app.use('/api/data', serviceRoute);

const PORT = process.env.PORT | 5000;

app.get('/', (req, res) => {
    res.status(200).send("Hello this is home page");
})


connectDB().then( () => {
    app.listen(PORT, () => {
        console.log(`server connected to port ${PORT}`);
    })
})