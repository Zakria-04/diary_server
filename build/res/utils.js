"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMessage = void 0;
const errorMessage = (error, res) => {
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
    res.status(500).json({ error: true, errorMsg: errorMessage });
    return errorMessage;
};
exports.errorMessage = errorMessage;
