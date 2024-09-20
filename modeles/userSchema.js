const mongoose = require("mongoose");

const userschema = mongoose.Schema({
    name: {
        required : [true, "Please fill the name"],
        trim: true,
        maxLength: [30, "Name is not more than 30 character"],
        minLength: [3, "Name at least 3 character"],
        type: String
    },

    email: {
        required : [true, "Please fill the email"],
        trim: true,
        lowercase: true,
        type: String,
        unique: true,
        match:[
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            "Please fill a valid email address",
        ]

    },
    password: {
        type: String,
        minLength: [6, "password must be at least 6 char"],
        maxLength: [16, "Password is too long"],
        trim: true,
        required: [true, "please enter password"]
    }
})

const User = mongoose.model("user", userschema);
module.exports = User;

