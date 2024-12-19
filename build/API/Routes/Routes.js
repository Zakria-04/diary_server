"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const diary_routes_1 = __importDefault(require("./diary.routes"));
const user_routes_1 = __importDefault(require("./user.routes"));
const Routes = [user_routes_1.default, diary_routes_1.default];
exports.default = Routes;
