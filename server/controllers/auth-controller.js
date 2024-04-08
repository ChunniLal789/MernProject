const express = require('express');

const home = async(req, res) => {
    try {
        res.status(200).send("Hello this is home page from controllers");
    } catch (error) {
        console.log(error);
    }
}

const register = async(req, res) => {
    try {
        res.status(200).send("Hello this is register page from controllers");
    } catch (error) {
        console.log(error);
    }
}

module.exports = {home, register};
