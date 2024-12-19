"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const getDate = new Date();
const day = getDate.getDate();
const month = getDate.getMonth() + 1;
const year = getDate.getFullYear();
const fullDate = `${day},${month},${year}`;
const diarySchema = new mongoose_1.Schema({
    authID: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        minLength: [5, "title must be at least 10 characters"],
    },
    context: {
        type: String,
        required: true,
        maxLength: [300, "max characters must be 70"],
    },
    timeStamp: {
        type: String,
        default: fullDate,
    },
}, { timestamps: true });
const DIARY_MODEL = (0, mongoose_1.model)("diary", diarySchema);
exports.default = DIARY_MODEL;
