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
exports.default = HouseCard;
const material_1 = require("@mui/material");
const react_redux_1 = require("react-redux");
const MoreVertSharp_1 = __importDefault(require("@mui/icons-material/MoreVertSharp"));
const react_1 = require("react");
const CloseSharp_1 = __importDefault(require("@mui/icons-material/CloseSharp"));
const snackbar_slice_1 = require("../slices/snackbar.slice");
const api_1 = __importDefault(require("../http/api"));
const house_slice_1 = require("../slices/house.slice");
const numberfmt_1 = __importDefault(require("@tuplo/numberfmt"));
function HouseCard({ house }) {
    var _a, _b;
    const { user } = (0, react_redux_1.useSelector)((state) => state.user);
    const { theme } = (0, react_redux_1.useSelector)((state) => state.theme);
    const { houses } = (0, react_redux_1.useSelector)((state) => state.house);
    const { currency, curVal } = (0, react_redux_1.useSelector)((state) => state.currency);
    const [expanded, setExpanded] = (0, react_1.useState)(false);
    const [openedPop, setOpenedPop] = (0, react_1.useState)(false);
    const [openedAlert, setOpenedAlert] = (0, react_1.useState)(false);
    const [isLoading, setIsLoading] = (0, react_1.useState)(false);
    const [anchorEl, setAnchorEl] = (0, react_1.useState)(null);
    const dispatch = (0, react_redux_1.useDispatch)();
    const onDeleteHouse = (houseId) => __awaiter(this, void 0, void 0, function* () {
        try {
            setIsLoading(true);
            const { data } = yield api_1.default.delete(`/house/delete/${houseId}`);
            dispatch((0, house_slice_1.setHouses)(houses.filter(house => +house.id !== houseId)));
            setOpenedAlert(false);
            setOpenedPop(false);
            dispatch((0, snackbar_slice_1.setOpenedSnack)(true));
            dispatch((0, snackbar_slice_1.setSeverity)("success"));
            dispatch((0, snackbar_slice_1.setSnackMessage)(data.message));
            // @ts-ignore
        }
        catch (error) {
            dispatch((0, snackbar_slice_1.setOpenedSnack)(true));
            dispatch((0, snackbar_slice_1.setSeverity)("error"));
            dispatch((0, snackbar_slice_1.setSnackMessage)(error.response.data.message));
        }
        finally {
            setIsLoading(false);
        }
    });
    // useEffect(() => {
    //   dispatch(setInitialPrice(house.price));
    //   // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [house.price]);
    return (<>
      <material_1.Card sx={{
            bgcolor: "primary.main",
            color: "primary.contrastText",
            border: "1px solid green",
            position: "relative",
        }} className="w-full">
        <material_1.CardHeader sx={{ color: `${theme === "dark" ? "white" : "black"}` }} avatar={<material_1.Avatar sx={{
                bgcolor: `rgb(${Math.random() * 255}, ${Math.random() * 255}, ${Math.random() * 255})`,
            }} aria-label="recipe">
              {(_b = (_a = house.owner.username) === null || _a === void 0 ? void 0 : _a.at(0)) === null || _b === void 0 ? void 0 : _b.toUpperCase()}
            </material_1.Avatar>} title={house.owner.email} subheader={house.owner.phone} subheaderTypographyProps={{ color: `${theme === "dark" ? "white" : "black"}` }}/>
        <material_1.CardMedia component="img" height="194" image={`${process.env.API_URL}/${house.image}`} alt={house.label}/>
        <material_1.CardContent className="flex justify-between flex-col gap-2">
          <material_1.Typography variant="h5" sx={{
            color: "primary.contrastText",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        }} className="line-clamp-2">
            <span>{house.label}</span>
            {+house.owner.id === +user.id && (<span className="cursor-pointer rounded-full hover:bg-transparent/25 w-8 -h-8 flex items-center justify-center p-1" onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setOpenedPop(true);
            }}>
                <MoreVertSharp_1.default color="success" className="text-center"/>
              </span>)}
          </material_1.Typography>
          <material_1.Typography variant="h6" sx={{ color: "primary.contrastText", textAlign: "right" }}>
            {(0, numberfmt_1.default)(house.price * curVal, "0a")}
            <span className="text-green-500 pl-1">{currency.toUpperCase()}</span>
          </material_1.Typography>
          <div className="underline text-green-500 cursor-pointer text-center" onClick={() => setExpanded(true)}>
            Show more
          </div>
        </material_1.CardContent>
        <material_1.CardActions disableSpacing></material_1.CardActions>
      </material_1.Card>
      <material_1.Dialog open={expanded} onClose={() => setExpanded(false)}>
        <material_1.DialogContent sx={{ bgcolor: "primary.main", color: "primary.contrastText" }}>
          <material_1.DialogActions>
            <span className="cursor-pointer" onClick={() => setExpanded(false)}>
              <CloseSharp_1.default />
            </span>
          </material_1.DialogActions>
          {house.body}
        </material_1.DialogContent>
      </material_1.Dialog>
      <material_1.Popover open={openedPop} anchorEl={anchorEl} onClose={() => setOpenedPop(false)} anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
        }}>
        <div className="p-1 border-b-2 border-black text-green-500 cursor-pointer hover:bg-gray-200" onClick={() => {
            dispatch((0, house_slice_1.setHouseState)("edit"));
            dispatch((0, house_slice_1.setOpenedDialog)(true));
            dispatch((0, house_slice_1.setHouse)(house));
            setOpenedPop(false);
        }}>
          Edit house
        </div>
        <div className="p-1 text-red-500 cursor-pointer hover:bg-gray-200" onClick={() => setOpenedAlert(true)}>
          Delete house
        </div>
      </material_1.Popover>
      <material_1.Dialog open={openedAlert} onClose={() => {
            setOpenedAlert(false);
            setOpenedPop(false);
        }}>
        <material_1.DialogContent sx={{ bgcolor: "primary.main" }}>
          <material_1.DialogContentText sx={{ color: "primary.contrastText", marginBottom: 1 }}>
            Are you sure to delete this one of the your houses?
          </material_1.DialogContentText>
          <material_1.DialogActions>
            <material_1.Button color="success" variant="outlined" onClick={() => {
            setOpenedAlert(false);
            setOpenedPop(false);
        }}>
              Cancel
            </material_1.Button>
            <material_1.Button color="error" variant="contained" onClick={() => onDeleteHouse(+house.id)} disabled={isLoading}>
              Delete
            </material_1.Button>
          </material_1.DialogActions>
        </material_1.DialogContent>
      </material_1.Dialog>
    </>);
}
