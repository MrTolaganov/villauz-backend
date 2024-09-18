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
exports.default = Navbar;
const material_1 = require("@mui/material");
const react_router_dom_1 = require("react-router-dom");
const WbSunnySharp_1 = __importDefault(require("@mui/icons-material/WbSunnySharp"));
const react_redux_1 = require("react-redux");
const NightsStaySharp_1 = __importDefault(require("@mui/icons-material/NightsStaySharp"));
const theme_slice_1 = require("../slices/theme.slice");
const authstate_slice_1 = require("../slices/authstate.slice");
const react_1 = require("react");
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("../http/axios"));
const user_slice_1 = require("../slices/user.slice");
const snackbar_slice_1 = require("../slices/snackbar.slice");
const currency_slice_1 = require("../slices/currency.slice");
function Navbar() {
    var _a, _b;
    const { theme } = (0, react_redux_1.useSelector)((state) => state.theme);
    const { isAuth } = (0, react_redux_1.useSelector)((state) => state.authState);
    const { user } = (0, react_redux_1.useSelector)((state) => state.user);
    const { currency } = (0, react_redux_1.useSelector)((state) => state.currency);
    const [openedPopover, setOpenedPopover] = (0, react_1.useState)(false);
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { mutate } = (0, react_query_1.useMutation)({
        mutationKey: ["sign-out"],
        mutationFn: () => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.delete("/auth/signout");
            return data;
        }),
        onSuccess: () => {
            dispatch((0, authstate_slice_1.setIsAuth)(false));
            dispatch((0, user_slice_1.setUser)({}));
            localStorage.removeItem("accessToken");
            navigate("/auth");
            setOpenedPopover(false);
        },
        onError: (error) => {
            dispatch((0, snackbar_slice_1.setOpenedSnack)(true));
            dispatch((0, snackbar_slice_1.setSeverity)("error"));
            // @ts-ignore
            dispatch(setSnackMessage(error.response.data.message));
        },
    });
    return (<material_1.Box sx={{
            color: "primary.contrastText",
            height: "10vh",
            position: "fixed",
            bgcolor: "primary.main",
            zIndex: 100,
            inset: 0,
        }}>
      <material_1.Container sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderBottom: "1px solid green",
        }}>
        <material_1.Box>
          <react_router_dom_1.Link to={"/"}>
            <img src="/villauz-logo.png" alt="Villauz" width={150} height={150}/>
          </react_router_dom_1.Link>
        </material_1.Box>
        <material_1.Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <div className="cursor-pointer" onClick={() => {
            dispatch((0, theme_slice_1.toggleTheme)());
            localStorage.setItem("villauz-theme", JSON.stringify(theme === "dark" ? "light" : "dark"));
        }}>
            {theme === "dark" ? <WbSunnySharp_1.default /> : <NightsStaySharp_1.default />}
          </div>
          {isAuth ? (<>
              {user.activated && (<select id="currency" className="p-2 bg-inherit border-2 border-green-500 text-green-500" value={currency} onChange={(e) => {
                    dispatch((0, currency_slice_1.setCurrency)(e.target.value));
                    dispatch((0, currency_slice_1.setCurVal)());
                }}>
                  <option value="usd" className={`${currency === "usd" && "hidden"}`}>
                    USD
                  </option>
                  <option value="eur" className={`${currency === "eur" && "hidden"}`}>
                    EUR
                  </option>
                  <option value="uzs" className={`${currency === "uzs" && "hidden"}`}>
                    UZS
                  </option>
                </select>)}
              <span onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setOpenedPopover(true);
            }}>
                <material_1.Avatar sx={{
                bgcolor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
                cursor: "pointer",
            }}>
                  {(_b = (_a = user === null || user === void 0 ? void 0 : user.username) === null || _a === void 0 ? void 0 : _a.at(0)) === null || _b === void 0 ? void 0 : _b.toUpperCase()}
                </material_1.Avatar>
              </span>
              <material_1.Popover open={openedPopover} onClose={() => setOpenedPopover(false)} anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }} anchorEl={anchorEl}>
                <material_1.Typography sx={{ p: 1, borderBottom: "1px solid green" }}>
                  @{user === null || user === void 0 ? void 0 : user.username}
                </material_1.Typography>
                <material_1.Typography sx={{ p: 1, borderBottom: "1px solid green" }}>
                  {user === null || user === void 0 ? void 0 : user.email}
                </material_1.Typography>
                <material_1.Typography sx={{ p: 1, borderBottom: "1px solid green" }}>
                  {user === null || user === void 0 ? void 0 : user.phone}
                </material_1.Typography>
                <material_1.Box>
                  <material_1.Button variant="contained" color="error" fullWidth sx={{ margin: 1 }} onClick={() => mutate()}>
                    Sign out
                  </material_1.Button>
                </material_1.Box>
              </material_1.Popover>
            </>) : (<>
              <material_1.Button sx={{ bgcolor: "green" }} onClick={() => {
                dispatch((0, authstate_slice_1.setAuthState)("signin"));
                dispatch((0, authstate_slice_1.setIsOpen)(true));
                navigate("/auth");
            }}>
                Sign in
              </material_1.Button>
              <material_1.Button variant="contained" sx={{ color: "green" }} onClick={() => {
                dispatch((0, authstate_slice_1.setAuthState)("signup"));
                dispatch((0, authstate_slice_1.setIsOpen)(true));
                navigate("/auth");
            }}>
                Sign up
              </material_1.Button>
            </>)}
        </material_1.Box>
      </material_1.Container>
    </material_1.Box>);
}
