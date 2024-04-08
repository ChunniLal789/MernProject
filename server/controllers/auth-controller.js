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
        console.log(req.body);
        res.status(200).json({msg : req.body});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {home, register}; 
