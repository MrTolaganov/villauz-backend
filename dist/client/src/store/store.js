"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.store = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const theme_slice_1 = __importDefault(require("../slices/theme.slice"));
const authstate_slice_1 = __importDefault(require("../slices/authstate.slice"));
const snackbar_slice_1 = __importDefault(require("../slices/snackbar.slice"));
const user_slice_1 = __importDefault(require("../slices/user.slice"));
const house_slice_1 = __importDefault(require("../slices/house.slice"));
const currency_slice_1 = __importDefault(require("../slices/currency.slice"));
exports.store = (0, toolkit_1.configureStore)({
    reducer: {
        theme: theme_slice_1.default,
        authState: authstate_slice_1.default,
        snackbar: snackbar_slice_1.default,
        user: user_slice_1.default,
        house: house_slice_1.default,
        currency: currency_slice_1.default,
    },
});
