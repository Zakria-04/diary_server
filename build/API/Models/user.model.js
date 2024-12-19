"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
        minLength: [3, "Username must be at least 3 characters long"],
        maxLength: [20, "Username cannot be more than 20 characters"],
        trim: true,
        validate: {
            validator: function (value) {
                return /^[a-z._]+$/.test(value);
            },
            message: "Username must only contain lowercase letters (a-z), '.' (dot), and '_' (underscore).",
        },
    },
    userPass: {
        type: String,
        require: true,
        minLength: [7, "Password must be at least 7 characters"],
    },
    email: {
        type: String,
        unique: true,
        default: null,
        match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
});
const USER_MODEL = (0, mongoose_1.model)("diary_user", userSchema);
exports.default = USER_MODEL;
