const express = require('express');
const router = express.Router();

router.route('/').get((req, res) => {
    res.status(200).send("Hello this is home page from router");
})

router.route('/register').get((req,res) => {
    res.status(200).send("Hello this is register page from router");
})

module.exports = router;
