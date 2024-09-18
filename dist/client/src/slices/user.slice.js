"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setUser = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    user: {},
};
const userSlice = (0, toolkit_1.createSlice)({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});
exports.setUser = userSlice.actions.setUser;
exports.default = userSlice.reducer;
