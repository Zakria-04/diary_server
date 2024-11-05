"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProfile = exports.removeDiaryFromDB = exports.createNewDiary = exports.loginUser = exports.createNewUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_module_1 = __importDefault(require("../Models/user.module"));
const utils_1 = __importDefault(require("../../res/utils"));
//* creating a new user
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userPass } = req.body;
    //  hash the password to make it secure
    const hashPass = yield bcryptjs_1.default.hash(userPass, 10);
    try {
        const Cres = yield user_module_1.default.create({
            userName: userName,
            userPass: hashPass,
        });
        res.status(200).json({ user: Cres });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error on updating profile", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
});
exports.createNewUser = createNewUser;
//* login user information
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userName, userPass } = req.body;
        const user = yield user_module_1.default.findOne({ userName });
        if (!user) {
            res.status(401).json({
                auth: false,
                errorMessage: "name or password are incorrect",
            });
            return;
        }
        // Compare the provided password with the stored hashed password
        const isPasswordValid = yield bcryptjs_1.default.compare(userPass, user.userPass);
        if (!isPasswordValid) {
            res.status(401).json({
                auth: false,
                errorMessage: "name or password are incorrect",
            });
            return;
        }
        if (isPasswordValid) {
            res.status(200).json({ user });
            return;
        }
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error on updating profile", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
});
exports.loginUser = loginUser;
//* create a new diary and push it to the db
const createNewDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, diaryData } = req.body;
        // find user based on ID
        const user = yield (0, utils_1.default)(userID);
        if (!user) {
            res.status(404).json({ error: "user has not been found!" });
            return;
        }
        user.userDiaryData.unshift(diaryData);
        // save the updated user data
        const response = yield user.save();
        // Respond with the updated user data
        res.status(200).json({ user: response });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error on updating profile", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
});
exports.createNewDiary = createNewDiary;
//* delete diary item from db
const removeDiaryFromDB = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userID, diaryID } = req.body;
        const user = yield (0, utils_1.default)(userID);
        if (!user) {
            res.status(500).json({ error: "user has not been found" });
            return;
        }
        // get user based on id
        function checkID(getID) {
            return getID.id === diaryID;
        }
        // get index of the item
        const getDiaryIndex = user.userDiaryData.findIndex(checkID);
        if (getDiaryIndex !== -1) {
            user.userDiaryData.splice(getDiaryIndex, 1);
        }
        const response = yield user.save();
        res.status(200).json({ user: response });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error on updating profile", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
});
exports.removeDiaryFromDB = removeDiaryFromDB;
//* update profile from db
const updateProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { updateData, userID } = req.body;
        // find user based on ID
        const user = yield (0, utils_1.default)(userID);
        if (!user) {
            res.status(404).json({ error: "user has not been found" });
            return;
        }
        // get and hash the user password to make it secure
        const updateAndHashPass = yield bcryptjs_1.default.hash(updateData.userPass, 10);
        // update the user data
        user.userName = updateData.userName || user.userName;
        user.userPass = updateAndHashPass || user.userPass;
        // save the updated data into db
        const response = yield user.save();
        // response
        res.status(200).json({ user: response });
    }
    catch (error) {
        const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
        console.error("Error on updating profile", errorMessage);
        res.status(500).json({ error: errorMessage });
    }
});
exports.updateProfile = updateProfile;
