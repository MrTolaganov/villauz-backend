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
exports.default = Auth;
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const react_query_1 = require("@tanstack/react-query");
const react_1 = require("react");
const constants_1 = require("../constants");
const react_router_dom_1 = require("react-router-dom");
const authstate_slice_1 = require("../slices/authstate.slice");
const snackbar_slice_1 = require("../slices/snackbar.slice");
const axios_1 = __importDefault(require("../http/axios"));
const user_slice_1 = require("../slices/user.slice");
function Auth() {
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const { authState, isOpen, passState, isAuth } = (0, react_redux_1.useSelector)((state) => state.authState);
    const { theme } = (0, react_redux_1.useSelector)((state) => state.theme);
    const [userData, setUserData] = (0, react_1.useState)(constants_1.initialUserDataState);
    const [sended, setSended] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { mutate } = (0, react_query_1.useMutation)({
        mutationKey: ["auth"],
        mutationFn: (values) => __awaiter(this, void 0, void 0, function* () {
            setIsLoading(true);
            if (authState === "signin") {
                const { data } = yield axios_1.default.post("/auth/signin", {
                    email: values.email,
                    pass: values.password,
                });
                return data;
            }
            if (authState === "signup") {
                const { data } = yield axios_1.default.post("/auth/signup", {
                    username: values.username,
                    email: values.email,
                    phone: values.phone,
                    pass: values.password,
                });
                return data;
            }
            if (authState === "forgot-pass") {
                console.log(userData.email);
                const { data } = yield axios_1.default.post("/auth/forgot-pass", { email: userData.email });
                return data;
            }
        }),
        onSuccess: data => {
            setIsLoading(false);
            if (authState === "signin" || authState === "signup") {
                dispatch((0, authstate_slice_1.setIsAuth)(true));
                dispatch((0, authstate_slice_1.setIsOpen)(false));
                dispatch((0, user_slice_1.setUser)(Object.assign({}, data.user)));
                localStorage.setItem("accessToken", data.accessToken);
                if (!data.user.activated) {
                    navigate("/activation");
                }
                else {
                    navigate("/");
                    dispatch((0, snackbar_slice_1.setOpenedSnack)(true));
                    dispatch((0, snackbar_slice_1.setSeverity)("success"));
                    dispatch((0, snackbar_slice_1.setSnackMessage)(`User signed ${authState === "signin" ? "in" : "up"} successfully`));
                }
            }
            else {
                setSended(true);
                dispatch((0, snackbar_slice_1.setOpenedSnack)(true));
                dispatch((0, snackbar_slice_1.setSeverity)("success"));
                dispatch((0, snackbar_slice_1.setSnackMessage)(`Recovery Account has just sended this ${userData.email} email`));
            }
        },
        onError: (err) => {
            setIsLoading(false);
            dispatch((0, snackbar_slice_1.setOpenedSnack)(true));
            dispatch((0, snackbar_slice_1.setSeverity)("error"));
            // @ts-ignore
            dispatch((0, snackbar_slice_1.setSnackMessage)(err.response.data.message));
        },
    });
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        mutate(userData);
    });
    const handleCloseDialog = () => {
        dispatch((0, authstate_slice_1.setIsOpen)(false));
        navigate("/");
    };
    (0, react_1.useEffect)(() => {
        if (isAuth) {
            navigate("/");
        }
        else {
            dispatch((0, authstate_slice_1.setIsOpen)(true));
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth]);
    return (<main className="h-[90vh] mt-[10vh]">
      <material_1.Dialog open={isOpen} onClose={handleCloseDialog} fullWidth>
        <material_1.DialogContent sx={{ bgcolor: "primary.main" }}>
          <material_1.DialogTitle sx={{ color: "greenyellow", textAlign: "center" }}>
            {authState === "signin" && "Sign in"}
            {authState === "signup" && "Sign up"}
            {authState === "forgot-pass" && "Forgot password"}
          </material_1.DialogTitle>
          <form action="" className="flex flex-col gap-2 items-center" onSubmit={handleSubmit}>
            {authState === "signup" && (<div className={`w-full md:w-3/4 flex flex-col ${theme === "dark" ? "dark:text-white" : "text-black"} gap-1`}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" className={`p-2 ${theme === "dark" ? "dark:bg-slate-950" : "bg-gray-100"}`} value={userData.username} onChange={(e) => setUserData(Object.assign(Object.assign({}, userData), { username: e.target.value }))}/>
              </div>)}
            <div className={`w-full md:w-3/4 flex flex-col ${theme === "dark" ? "dark:text-white" : "text-black"} gap-1`}>
              {sended && (<material_1.Alert severity={"info"}>
                  Please check your email address and click the recover account button to recover
                  your account
                </material_1.Alert>)}
              <label htmlFor="email">Email</label>
              <input type="email" id="email" disabled={sended} className={`p-2 ${theme === "dark" ? "dark:bg-slate-950" : "bg-gray-100"}`} value={userData.email} onChange={(e) => setUserData(Object.assign(Object.assign({}, userData), { email: e.target.value }))}/>
            </div>
            {authState === "signup" && (<div className={`w-full md:w-3/4 flex flex-col ${theme === "dark" ? "dark:text-white" : "text-black"} gap-1`}>
                <label htmlFor="phone">Phone</label>
                <input type="text" id="phone" className={`p-2 ${theme === "dark" ? "dark:bg-slate-950" : "bg-gray-100"}`} value={userData.phone} onChange={(e) => setUserData(Object.assign(Object.assign({}, userData), { phone: e.target.value }))}/>
              </div>)}
            {(authState === "signin" || authState === "signup") && (<div className={`w-full md:w-3/4 flex flex-col ${theme === "dark" ? "dark:text-white" : "text-black"} gap-1`}>
                <label htmlFor="password">Password</label>
                <input type={passState === "hide" ? "password" : "text"} id="password" className={`p-2 ${theme === "dark" ? "dark:bg-slate-950" : "bg-gray-100"}`} value={userData.password} onChange={(e) => setUserData(Object.assign(Object.assign({}, userData), { password: e.target.value }))}/>
                <div className="space-x-1">
                  <input type="checkbox" id="pass-state" className="accent-green-500" checked={passState === "show" ? true : false} onChange={() => dispatch((0, authstate_slice_1.setPassState)(passState === "hide" ? "show" : "hide"))}/>
                  <label htmlFor="pass-state" className={`${theme === "dark" ? "text-white" : "text-black"}`}>
                    {passState === "hide" ? "Show " : "Hide "}password
                  </label>
                </div>
              </div>)}
            {(authState === "signin" || authState === "signup") && (<div className="flex flex-col items-start text-sm w-full md:w-3/4">
                <div className="space-x-1">
                  <span className={`${theme === "dark" ? "text-white" : "text-black"}`}>
                    {authState === "signin" ? "Don't have " : "Have "}an account?
                  </span>
                  <span className="cursor-pointer text-green-500 underline" onClick={() => dispatch((0, authstate_slice_1.setAuthState)(authState === "signin" ? "signup" : "signin"))}>
                    {authState === "signin" ? "Sign up" : "Sign in"}
                  </span>
                </div>
                {authState === "signin" && (<p className="cursor-pointer text-green-500 underline" onClick={() => dispatch((0, authstate_slice_1.setAuthState)("forgot-pass"))}>
                    Forgot password?
                  </p>)}
              </div>)}
            <div className="w-full md:w-3/4">
              <material_1.Button fullWidth type="submit" color="success" variant="contained" disabled={isLoading} sx={{ marginTop: 2 }}>
                Submit
              </material_1.Button>
            </div>
          </form>
        </material_1.DialogContent>
      </material_1.Dialog>
    </main>);
}
