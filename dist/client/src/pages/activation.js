"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Activation;
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
function Activation() {
    const { user } = (0, react_redux_1.useSelector)((state) => state.user);
    const { isAuth } = (0, react_redux_1.useSelector)((state) => state.authState);
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_1.useEffect)(() => {
        if (user.activated || !isAuth) {
            navigate("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user.activated]);
    return (<div className="min-h-screen flex justify-center items-center">
      <material_1.Container sx={{ color: "primary.contrastText" }}>
        <material_1.Alert severity="warning" className="w-full md:w-1/2 mx-auto" sx={{
            bgcolor: "primary.main",
            border: "1px solid yellow",
            color: "primary.contrastText",
        }}>
          Please activate your account that sended your gmail address.
        </material_1.Alert>
      </material_1.Container>
    </div>);
}
