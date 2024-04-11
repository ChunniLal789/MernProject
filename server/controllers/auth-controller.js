const express = require('express');
const User = require('../models/user-model');
const bcrypt = require('bcrypt');
const { use } = require('../router/auth-router');

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
        res.status(200).json({msg : "Registration successful", token : await newUser.generateToken(), userID : newUser._id.toString()});
    } catch (error) {
        console.log(error);
    }
}

const login = async(req, res) => {
    try {
        const {email, password} = req.body;

        const userExist = await User.findOne({email});
        if(!userExist){
            res.status(400).json({msg : "Invalid credentials"});
            return ;
        }

        const user = await userExist.comparePassword(password);
        
        if(user){
            res.status(200).json(
            {   msg : "Login successful", 
                token : await userExist.generateToken(),
                userID : userExist._id.toString()
            });
        }else{
            res.status(401).json({msg : "Invalid email or password"});
        }
    } catch (error) {
        res.status(500).json({msg : "Login error"});
    }
}

module.exports = {home, register, login}; 
