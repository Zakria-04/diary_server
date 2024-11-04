"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const diary_data_schema = new mongoose_1.Schema({
    id: Number,
    date: String,
    title: String,
    textArea: String,
});
const user_schema = new mongoose_1.Schema({
    userName: {
        type: String,
        required: true,
        unique: true,
    },
    userPass: {
        type: String,
        required: true,
    },
    userDiaryData: {
        type: [diary_data_schema],
        default: [],
    },
});
const USER_MODEL = (0, mongoose_1.model)("diary_db", user_schema);
exports.default = USER_MODEL;
