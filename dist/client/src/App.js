"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = App;
const react_router_dom_1 = require("react-router-dom");
const navbar_1 = __importDefault(require("./components/navbar"));
const home_1 = __importDefault(require("./pages/home"));
const auth_1 = __importDefault(require("./pages/auth"));
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const theme_1 = require("./lib/theme");
const material_2 = require("@mui/material");
const snackbar_slice_1 = require("./slices/snackbar.slice");
const axios_1 = __importDefault(require("./http/axios"));
const user_slice_1 = require("./slices/user.slice");
const authstate_slice_1 = require("./slices/authstate.slice");
const react_1 = require("react");
const house_slice_1 = require("./slices/house.slice");
const house_dialog_1 = __importDefault(require("./components/house-dialog"));
const activation_1 = __importDefault(require("./pages/activation"));
const recovery_1 = __importDefault(require("./pages/recovery"));
function App() {
    const { theme } = (0, react_redux_1.useSelector)((state) => state.theme);
    const { openedSnack, snackMessage, severity } = (0, react_redux_1.useSelector)((state) => state.snackbar);
    const { isAuth } = (0, react_redux_1.useSelector)((state) => state.authState);
    const { user } = (0, react_redux_1.useSelector)((state) => state.user);
    const dispatch = (0, react_redux_1.useDispatch)();
    const checkAuth = () => __awaiter(this, void 0, void 0, function* () {
        try {
            const { data } = yield axios_1.default.get("/auth/refresh");
            dispatch((0, user_slice_1.setUser)(data.user));
            dispatch((0, authstate_slice_1.setIsAuth)(true));
            localStorage.setItem("accessToken", data.accessToken);
            return data;
        }
        catch (_a) {
            dispatch((0, authstate_slice_1.setIsAuth)(false));
            localStorage.removeItem("accessToken");
        }
    });
    (0, react_1.useEffect)(() => {
        if (localStorage.getItem("accessToken")) {
            checkAuth();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    console.log(process.env.API_URL);
    return (<material_1.ThemeProvider theme={theme === "dark" ? theme_1.darkTheme : theme_1.lightTheme}>
      <material_1.Box sx={{ bgcolor: "primary.main" }} className="min-h-screen">
        <material_1.Container fixed>
          <navbar_1.default />
          <react_router_dom_1.Routes>
            <react_router_dom_1.Route path="/" element={<home_1.default user={user}/>}/>
            <react_router_dom_1.Route path="/auth" element={<auth_1.default />}/>
            <react_router_dom_1.Route path="/activation" element={<activation_1.default />}/>
            <react_router_dom_1.Route path="/rec-acc/:token" element={<recovery_1.default />}/>
          </react_router_dom_1.Routes>
        </material_1.Container>
        <material_2.Snackbar open={openedSnack} anchorOrigin={{ vertical: "bottom", horizontal: "center" }} onClose={() => dispatch((0, snackbar_slice_1.setOpenedSnack)(false))} autoHideDuration={3000}>
          <material_2.Alert severity={severity} onClose={() => dispatch((0, snackbar_slice_1.setOpenedSnack)(false))}>
            {snackMessage}
          </material_2.Alert>
        </material_2.Snackbar>
        {isAuth && (<span className="relative cursor-pointer" onClick={() => {
                dispatch((0, house_slice_1.setHouseState)("add"));
                dispatch((0, house_slice_1.setOpenedDialog)(true));
            }}>
            <material_1.Avatar sx={{
                bgcolor: "green",
                position: "fixed",
                bottom: 20,
                right: 20,
                width: 50,
                height: 50,
                fontSize: 32,
            }}>
              +
            </material_1.Avatar>
          </span>)}
      </material_1.Box>
      <house_dialog_1.default />
    </material_1.ThemeProvider>);
}
