"use strict";
// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
const vite_1 = require("vite");
const plugin_react_1 = __importDefault(require("@vitejs/plugin-react"));
// https://vitejs.dev/config/
exports.default = (0, vite_1.defineConfig)(({ mode }) => {
    const env = (0, vite_1.loadEnv)(mode, process.cwd(), "");
    return {
        define: {
            "process.env.API_URL": JSON.stringify(env.API_URL),
        },
        plugins: [(0, plugin_react_1.default)()],
    };
});
