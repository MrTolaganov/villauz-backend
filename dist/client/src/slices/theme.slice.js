"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.toggleTheme = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    theme: JSON.parse(localStorage.getItem("villauz-theme"))
        ? JSON.parse(localStorage.getItem("villauz-theme"))
        : "dark",
};
const themeSlice = (0, toolkit_1.createSlice)({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: state => {
            state.theme = state.theme === "dark" ? "light" : "dark";
        },
    },
});
exports.toggleTheme = themeSlice.actions.toggleTheme;
exports.default = themeSlice.reducer;
