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
exports.updateDiary = exports.getAllUserDiary = exports.deleteDiary = exports.createDiary = void 0;
const diary_model_1 = __importDefault(require("../Models/diary.model"));
const utils_1 = require("../../res/utils");
const user_model_1 = __importDefault(require("../Models/user.model"));
const createDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, context, authID } = req.body;
    try {
        const Cres = yield diary_model_1.default.create({
            authID,
            title,
            context,
        });
        res.status(200).json({ diary: Cres });
    }
    catch (error) {
        (0, utils_1.errorMessage)(error, res);
    }
});
exports.createDiary = createDiary;
const getAllUserDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authID } = req.body;
    try {
        const diaryList = yield diary_model_1.default.find();
        const userDiaryList = [];
        for (let i = 0; i < diaryList.length; i++) {
            if (authID === diaryList[i].authID) {
                userDiaryList.unshift(diaryList[i]);
            }
        }
        res.status(200).json(userDiaryList);
    }
    catch (error) {
        (0, utils_1.errorMessage)(error, res);
    }
});
exports.getAllUserDiary = getAllUserDiary;
const deleteDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { diaryIDs, authID } = req.body;
    try {
        if (!Array.isArray(diaryIDs) || diaryIDs.length === 0) {
            res.status(400).json({ error: "Invalid or empty diary IDs array!" });
            return;
        }
        const user = yield user_model_1.default.findById(authID);
        if (!user) {
            res.status(404).json("user not found!");
            return;
        }
        // check if one of the provided diary auth ids does not match with the auth id to prevent deleting other users diary
        for (let i = 0; i < diaryIDs.length; i++) {
            const findDiaryDocument = yield diary_model_1.default.findById(diaryIDs[i]);
            if ((findDiaryDocument === null || findDiaryDocument === void 0 ? void 0 : findDiaryDocument.authID) !== authID) {
                res.status(404).json({
                    error: "something went wrong, diary auth id does not match with any of the provided ids",
                });
                return;
            }
        }
        const result = yield diary_model_1.default.deleteMany({ _id: { $in: diaryIDs } });
        if (result.deletedCount === 0) {
            res.status(404).json({ error: "No diaries found for the provided IDs!" });
            return;
        }
        res.status(200).json({
            message: "Diaries deleted successfully!",
            deletedCount: result.deletedCount,
        });
    }
    catch (error) {
        (0, utils_1.errorMessage)(error, res);
    }
});
exports.deleteDiary = deleteDiary;
const updateDiary = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { diaryID, title, context } = req.body;
    try {
        if (diaryID === undefined) {
            res.status(401).json({ error: "invalid or missing diary id" });
            return;
        }
        const selectedDiary = yield diary_model_1.default.findOneAndUpdate({ _id: diaryID }, { title, context }, { new: true });
        if (!selectedDiary) {
            res.status(404).json({ error: "No diaries found for the provided id!" });
            return;
        }
        res.status(200).json({ message: "diary has been updated successfully" });
    }
    catch (error) {
        (0, utils_1.errorMessage)(error, res);
    }
});
exports.updateDiary = updateDiary;
