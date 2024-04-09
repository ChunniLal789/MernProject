const express = require('express');
const User = require('../models/user-model');

const home = async(req, res) => {
    try {
        res.status(200).send("Hello this is home page from controllers");
    } catch (error) {
        console.log(error);
    }
}

const register = async(req, res) => {
    try {
        const {username, email, phone, password} = req.body;

        const userExist = await User.findOne({email : email});
        if(userExist){
            res.status(400).json({msg : "User exist already"});
        }

        const newUser = await User.create({username, email, phone, password});
        res.status(200).json({msg : newUser, token : await newUser.generateToken(), userID : newUser._id.toString()});
    } catch (error) {
        console.log(error);
    }
}

module.exports = {home, register}; 
