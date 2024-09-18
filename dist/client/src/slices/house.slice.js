"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.setHouses = exports.setHouse = exports.setOpenedDialog = exports.setHouseState = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const initialState = {
    houseState: "add",
    openedDialog: false,
    house: {},
    houses: [],
};
const houseSlice = (0, toolkit_1.createSlice)({
    name: "house",
    initialState,
    reducers: {
        setHouseState: (state, action) => {
            state.houseState = action.payload;
        },
        setOpenedDialog: (state, action) => {
            state.openedDialog = action.payload;
        },
        setHouse: (state, action) => {
            state.house = action.payload;
        },
        setHouses: (state, action) => {
            state.houses = action.payload;
        },
    },
});
_a = houseSlice.actions, exports.setHouseState = _a.setHouseState, exports.setOpenedDialog = _a.setOpenedDialog, exports.setHouse = _a.setHouse, exports.setHouses = _a.setHouses;
exports.default = houseSlice.reducer;
