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
exports.default = HouseDialog;
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const house_slice_1 = require("../slices/house.slice");
const react_1 = require("react");
const constants_1 = require("../constants");
const api_1 = __importDefault(require("../http/api"));
const react_router_dom_1 = require("react-router-dom");
const axios_1 = __importDefault(require("../http/axios"));
function HouseDialog() {
    const { houseState, openedDialog } = (0, react_redux_1.useSelector)((state) => state.house);
    const { theme } = (0, react_redux_1.useSelector)((state) => state.theme);
    const { houses, house } = (0, react_redux_1.useSelector)((state) => state.house);
    const [houseData, setHouseData] = (0, react_1.useState)(constants_1.initialHouseDataState);
    const [file, setFile] = (0, react_1.useState)(null);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        if ((houseState === "add" && !file) || !houseData.label || !houseData.body || !houseData.price)
            return;
        setIsLoading(true);
        if (houseState === "add") {
            const formData = new FormData();
            formData.append("label", houseData.label);
            formData.append("body", houseData.body);
            formData.append("price", `${houseData.price}`);
            formData.append("image", file);
            const { data } = yield api_1.default.post("/house/create", formData);
            // dispatch(setHouse({ ...data.house } as HouseType));
            dispatch((0, house_slice_1.setHouses)([...houses, data.house]));
        }
        else {
            const { data } = yield api_1.default.put(`/house/update/${house === null || house === void 0 ? void 0 : house.id}`, {
                label: houseData.label,
                body: houseData.body,
                price: houseData.price,
            });
            // @ts-ignore
            dispatch((0, house_slice_1.setHouses)(houses.map(h => (+h.id === +(house === null || house === void 0 ? void 0 : house.id) ? data.house : h))));
        }
        setIsLoading(false);
        dispatch((0, house_slice_1.setOpenedDialog)(false));
        setHouseData(constants_1.initialHouseDataState);
        navigate("/");
    });
    const getHouseData = () => __awaiter(this, void 0, void 0, function* () {
        if (houseState === "edit") {
            const { data } = yield axios_1.default.get(`/house/gethouse/${house === null || house === void 0 ? void 0 : house.id}`);
            setHouseData(Object.assign({}, data.house));
        }
        else {
            setHouseData(constants_1.initialHouseDataState);
        }
    });
    (0, react_1.useEffect)(() => {
        getHouseData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [openedDialog]);
    return (<material_1.Dialog open={openedDialog} onClose={() => dispatch((0, house_slice_1.setOpenedDialog)(false))} fullWidth>
      <material_1.DialogContent sx={{ bgcolor: "primary.main" }}>
        <material_1.DialogTitle sx={{ color: "greenyellow", textAlign: "center" }}>
          {houseState === "add" ? "Add house" : "Edit house"}
        </material_1.DialogTitle>
        <form action="" className="flex flex-col gap-2 items-center" onSubmit={handleSubmit}>
          <div className={`w-full md:w-3/4 flex flex-col ${theme === "dark" ? "dark:text-white" : "text-black"} gap-1`}>
            <label htmlFor="label">Label</label>
            <input type="text" id="label" className={`p-2 ${theme === "dark" ? "dark:bg-slate-950" : "bg-gray-100"}`} value={houseData.label} onChange={(e) => setHouseData(Object.assign(Object.assign({}, houseData), { label: e.target.value }))}/>
          </div>
          <div className={`w-full md:w-3/4 flex flex-col ${theme === "dark" ? "dark:text-white" : "text-black"} gap-1`}>
            <label htmlFor="body">Body</label>
            <input type="body" id="body" className={`p-2 ${theme === "dark" ? "dark:bg-slate-950" : "bg-gray-100"}`} value={houseData.body} onChange={(e) => setHouseData(Object.assign(Object.assign({}, houseData), { body: e.target.value }))}/>
          </div>
          <div className={`w-full md:w-3/4 flex flex-col ${theme === "dark" ? "dark:text-white" : "text-black"} gap-1`}>
            <label htmlFor="price">Price</label>
            <input type="number" id="price" className={`p-2 ${theme === "dark" ? "dark:bg-slate-950" : "bg-gray-100"}`} placeholder="$" value={houseData.price ? houseData.price : ""} onChange={(e) => setHouseData(Object.assign(Object.assign({}, houseData), { price: +e.target.value }))}/>
          </div>
          {houseState === "add" && (<div className={`w-full md:w-3/4 flex flex-col ${theme === "dark" ? "dark:text-white" : "text-black"} gap-1`}>
              <label htmlFor="images">Images</label>
              <input type="file" id="images" className={`p-2 ${theme === "dark" ? "dark:bg-slate-950" : "bg-gray-100"}`} onChange={(e) => {
                setFile(e.target.files && e.target.files[0]);
            }}/>
            </div>)}
          <div className="w-full md:w-3/4">
            <material_1.Button fullWidth type="submit" color="success" variant="contained" disabled={isLoading} sx={{ marginTop: 2 }}>
              Submit
            </material_1.Button>
          </div>
        </form>
      </material_1.DialogContent>
    </material_1.Dialog>);
}
