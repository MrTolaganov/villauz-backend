"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setPassState = exports.setIsOpen = exports.setIsAuth = exports.setAuthState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    authState: "signin",
    isAuth: localStorage.getItem("accessToken") ? true : false,
    isOpen: false,
    passState: "hide",
};
const authStateSlice = (0, toolkit_1.createSlice)({
    name: "authState",
    initialState,
    reducers: {
        setAuthState: (state, action) => {
            state.authState = action.payload;
        },
        setIsAuth: (state, action) => {
            state.isAuth = action.payload;
        },
        setIsOpen: (state, action) => {
            state.isOpen = action.payload;
        },
        setPassState: (state, action) => {
            state.passState = action.payload;
        },
    },
});
_a = authStateSlice.actions, exports.setAuthState = _a.setAuthState, exports.setIsAuth = _a.setIsAuth, exports.setIsOpen = _a.setIsOpen, exports.setPassState = _a.setPassState;
exports.default = authStateSlice.reducer;
