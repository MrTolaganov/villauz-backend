"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setSeverity = exports.setSnackMessage = exports.setOpenedSnack = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    openedSnack: false,
    snackMessage: "",
    severity: "success",
};
const snackbarSlice = (0, toolkit_1.createSlice)({
    name: "snackbar",
    initialState,
    reducers: {
        setOpenedSnack: (state, action) => {
            state.openedSnack = action.payload;
        },
        setSnackMessage: (state, action) => {
            state.snackMessage = action.payload;
        },
        setSeverity: (state, action) => {
            state.severity = action.payload;
        },
    },
});
_a = snackbarSlice.actions, exports.setOpenedSnack = _a.setOpenedSnack, exports.setSnackMessage = _a.setSnackMessage, exports.setSeverity = _a.setSeverity;
exports.default = snackbarSlice.reducer;
