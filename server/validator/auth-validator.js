const { z } = require('zod');

const signUpSchema = z.object({
    username : z.
        string({required_error : "Name is required"}).
        trim().
        min(3, {message : "Name must be of atleast 3 characters"}).
        max(255, {message : "Name must not be more than 255 characters"}),
    email : z.
        string({required_error : "Email is required"}).
        trim().
        email({message : "Invalid email address"}).
        min(3, {message : "Email must be of atleast 3 characters"}).
        max(255, {message : "Email must not be more than 255 characters"}),
    phone : z.
        string({required_error : "Phone number is required"}).
        trim().
        min(10, {message : "Phone number must be of atleast 10 characters"}).
        max(20, {message : "Phone number must not be more than 10 characters"}),
    password : z.
        string({required_error : "Password is required"}).
        min(6, {message : "Password must be of atleast 6 characters"}).
        max(255, {message : "Password must not be more than 255 characters"}),
})

module.exports = signUpSchema;