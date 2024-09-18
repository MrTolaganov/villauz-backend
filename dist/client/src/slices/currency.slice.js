"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCurVal = exports.setCurrency = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    currency: "usd",
    curVal: 1,
};
const currencySlice = (0, toolkit_1.createSlice)({
    name: "currency",
    initialState,
    reducers: {
        setCurrency: (state, action) => {
            state.currency = action.payload;
        },
        setCurVal: state => {
            if (state.currency === "eur") {
                state.curVal = 0.91;
            }
            else if (state.currency === "uzs") {
                state.curVal = 12760;
            }
            else {
                state.curVal = 1;
            }
        },
    },
});
_a = currencySlice.actions, exports.setCurrency = _a.setCurrency, exports.setCurVal = _a.setCurVal;
exports.default = currencySlice.reducer;
