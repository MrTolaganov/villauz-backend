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
exports.default = Home;
const react_redux_1 = require("react-redux");
const react_query_1 = require("@tanstack/react-query");
const axios_1 = __importDefault(require("../http/axios"));
const house_slice_1 = require("../slices/house.slice");
const house_card_1 = __importDefault(require("../components/house-card"));
const react_router_dom_1 = require("react-router-dom");
const react_1 = require("react");
function Home({ user }) {
    const { houses } = (0, react_redux_1.useSelector)((state) => state.house);
    const { isAuth } = (0, react_redux_1.useSelector)((state) => state.authState);
    const dispatch = (0, react_redux_1.useDispatch)();
    const navigate = (0, react_router_dom_1.useNavigate)();
    (0, react_query_1.useQuery)({
        queryKey: ["all-houses"],
        queryFn: () => __awaiter(this, void 0, void 0, function* () {
            const { data } = yield axios_1.default.get("/house/gethouses");
            dispatch((0, house_slice_1.setHouses)(data.houses));
            return data;
        }),
    });
    (0, react_1.useEffect)(() => {
        // const timeout = setTimeout(() => {
        if (isAuth && !user.activated) {
            navigate("/activation");
        }
        // }, 2000);
        // return () => clearTimeout(timeout);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuth, user.activated]);
    return (<main className="mt-[10vh] text-white">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mx-auto">
        {houses &&
            houses
                .slice()
                .reverse()
                .map(house => <house_card_1.default key={house.id} house={house}/>)}
      </div>
    </main>);
}
