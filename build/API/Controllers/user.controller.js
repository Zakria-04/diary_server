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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.createNewUser = void 0;
const user_model_1 = __importDefault(require("../Models/user.model"));
const utils_1 = require("../../res/utils");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// create new user
const createNewUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { userName, userPass, email } = req.body;
    if (!email || email.trim() === "") {
        email = null;
    }
    try {
        const hashPass = yield bcryptjs_1.default.hash(userPass, 10);
        const Cres = yield user_model_1.default.create({
            userName,
            userPass: hashPass,
            email,
        });
        res.status(200).json({ user: Cres });
    }
    catch (error) {
        (0, utils_1.errorMessage)(error, res);
    }
});
exports.createNewUser = createNewUser;
// login user
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { userName, userPass } = req.body;
    try {
        const user = yield user_model_1.default.findOne({
            $or: [{ email: userName }, { userName }],
        });
        if (!user || !user.userPass) {
            res.status(401).json({
                type: "notUser",
                error: "UserName or Password are incorrect!",
            });
            return;
        }
        const isPasswordValid = yield bcryptjs_1.default.compare(userPass, user.userPass);
        if (!isPasswordValid) {
            res
                .status(401)
                .json({ type: "password", error: "Password is incorrect!" });
            return;
        }
        // Exclude sensitive fields before sending the user object
        const _a = user.toObject(), { userPass: _ } = _a, safeUser = __rest(_a, ["userPass"]);
        res.status(200).json({ user: safeUser });
    }
    catch (error) {
        (0, utils_1.errorMessage)(error, res);
    }
});
exports.loginUser = loginUser;
