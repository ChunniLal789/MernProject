const mongoose = require('mongoose');
const bcrpyt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    phone : {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true
    },
    isAdmin : {
        type : String,
        default : false
    }
})

userSchema.pre('save', async function(){
    const user = this;
    if(!user.isModified("password")){
        next();
    }
    try {
        const saltRound = await bcrpyt.genSalt(10);
        const hashPassword = await bcrpyt.hash(user.password, saltRound);
        user.password = hashPassword;
    } catch (error) {
        next(error);
    }
})

userSchema.methods.generateToken = async function(){
    try {
        return jwt.sign({
            userId : this._id.toString(),
            email : this.email,
            isAdmin : this.isAdmin
        },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn : '30d'
        }
    )
    } catch (error) {
        console.error(error);
    }
}

const User = new mongoose.model('User', userSchema);

module.exports = User;