"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.lightTheme = exports.darkTheme = void 0;
const material_1 = require("@mui/material");
exports.darkTheme = (0, material_1.createTheme)({
    palette: {
        primary: {
            main: "#001e2b",
            contrastText: "#fff",
        },
    },
});
exports.lightTheme = (0, material_1.createTheme)({
    palette: {
        primary: {
            main: "#fff5ef",
            contrastText: "#000",
        },
    },
});
