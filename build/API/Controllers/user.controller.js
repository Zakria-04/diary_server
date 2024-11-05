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
exports.removeDiaryFromDB = exports.createNewDiary = exports.loginUser = exports.createNewUser = void 0;
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
        console.error("Error on creating new user", error);
        res.status(500).json({ error: "failed to create new user" });
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
        console.error("Error logging user ", error);
        res.status(500).json({ errorMessage: error.message });
        return;
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
        console.error("Error on submitting diary data", error.message);
        res.status(500).json({ error: true, errorMessage: error.message });
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
        console.error("Error removing diary from db", error.message);
        res.status(500).json({ error: error.message });
    }
});
exports.removeDiaryFromDB = removeDiaryFromDB;
