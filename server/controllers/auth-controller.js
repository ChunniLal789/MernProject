const express = require('express');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');

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
            return res.status(400).json({message : "User exist already"});
        }

        const newUser = await User.create({username, email, phone, password});
        res.status(200).json({message : "Registration successful", token : await newUser.generateToken(), userID : newUser._id.toString()});
    } catch (error) {
        console.log(error);
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email});
        if(!userExist){
            return res.status(400).json({message : "Invalid credentials"});
        }

        const user = await userExist.comparePassword(password);
        
        if(user){
            res.status(200).json(
            {   message : "Login successful", 
                token : await userExist.generateToken(),
                userID : userExist._id.toString()
            });
        }else{
            res.status(401).json({message : "Invalid email or password"});
        }
    } catch (error) {
        res.status(500).json({message : "Login error"});
    }
}

const user = async(req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        res.status(200).json({userData});
    } catch (error) {
        console.log(`Error from user route ${error}`);
    }
}

module.exports = {home, register, login, user}; 
