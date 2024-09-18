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
exports.default = Recovery;
const material_1 = require("@mui/material");
const react_1 = require("react");
const react_redux_1 = require("react-redux");
const authstate_slice_1 = require("../slices/authstate.slice");
const snackbar_slice_1 = require("../slices/snackbar.slice");
const axios_1 = __importDefault(require("../http/axios"));
const react_router_dom_1 = require("react-router-dom");
function Recovery() {
    const { theme } = (0, react_redux_1.useSelector)((state) => state.theme);
    const { passState } = (0, react_redux_1.useSelector)((state) => state.authState);
    const [passVal, setPassVal] = (0, react_1.useState)({ newPass: "", confirmPass: "" });
    const [openRecDialog, setOpenedRecDialog] = (0, react_1.useState)(true);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const { token } = (0, react_router_dom_1.useParams)();
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if (!passVal.newPass.trim() || !passVal.confirmPass.trim()) {
            dispatch((0, snackbar_slice_1.setOpenedSnack)(true));
            dispatch((0, snackbar_slice_1.setSeverity)("error"));
            dispatch((0, snackbar_slice_1.setSnackMessage)("Password must not be empty"));
            return;
        }
        if (passVal.newPass !== passVal.confirmPass) {
            dispatch((0, snackbar_slice_1.setOpenedSnack)(true));
            dispatch((0, snackbar_slice_1.setSeverity)("error"));
            dispatch((0, snackbar_slice_1.setSnackMessage)("Confirm password must be the same as new password"));
            return;
        }
        if (passVal.confirmPass.length < 8) {
            dispatch((0, snackbar_slice_1.setOpenedSnack)(true));
            dispatch((0, snackbar_slice_1.setSeverity)("error"));
            dispatch((0, snackbar_slice_1.setSnackMessage)("Password must be existed at least 8 charecters"));
            return;
        }
        setIsLoading(true);
        const { data } = yield axios_1.default.put("/auth/rec-acc", { token, pass: passVal.confirmPass });
        dispatch((0, snackbar_slice_1.setOpenedSnack)(true));
        dispatch((0, snackbar_slice_1.setSeverity)("success"));
        dispatch((0, snackbar_slice_1.setSnackMessage)(data.message));
        setOpenedRecDialog(false);
        setIsLoading(false);
        dispatch((0, authstate_slice_1.setAuthState)("signin"));
        navigate("/auth");
    });
    return (<main className="h-[90vh] mt-[10vh]">
      <material_1.Dialog open={openRecDialog} fullWidth>
        <material_1.DialogContent sx={{ bgcolor: "primary.main" }}>
          <material_1.DialogTitle sx={{ color: "greenyellow", textAlign: "center" }}>
            Recovery Account
          </material_1.DialogTitle>
          <form action="" className="flex flex-col gap-2 items-center" onSubmit={handleSubmit}>
            <div className={`w-full md:w-3/4 flex flex-col  ${theme === "dark" ? "dark:text-white" : "text-black"} gap-1`}>
              <div className="flex flex-col">
                <label htmlFor="password">New password</label>
                <input type={passState === "hide" ? "password" : "text"} id="password" className={`p-2 ${theme === "dark" ? "dark:bg-slate-950" : "bg-gray-100"}`} value={passVal.newPass} onChange={(e) => setPassVal(Object.assign(Object.assign({}, passVal), { newPass: e.target.value }))}/>
              </div>
              <div className="flex flex-col">
                <label htmlFor="password">Confirm password</label>
                <input type={passState === "hide" ? "password" : "text"} id="password" className={`p-2 ${theme === "dark" ? "dark:bg-slate-950" : "bg-gray-100"}`} value={passVal.confirmPass} onChange={(e) => setPassVal(Object.assign(Object.assign({}, passVal), { confirmPass: e.target.value }))}/>
              </div>
              <div className="space-x-1">
                <input type="checkbox" id="pass-state" className="accent-green-500" checked={passState === "show" ? true : false} onChange={() => dispatch((0, authstate_slice_1.setPassState)(passState === "hide" ? "show" : "hide"))}/>
                <label htmlFor="pass-state" className={`${theme === "dark" ? "text-white" : "text-black"}`}>
                  {passState === "hide" ? "Show " : "Hide "}passwords
                </label>
              </div>
            </div>
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
