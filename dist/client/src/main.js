"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("react-dom/client");
const react_router_dom_1 = require("react-router-dom");
const App_tsx_1 = __importDefault(require("./App.tsx"));
require("./index.css");
const react_redux_1 = require("react-redux");
const store_ts_1 = require("./store/store.ts");
const react_query_1 = require("@tanstack/react-query");
const queryClient = new react_query_1.QueryClient();
(0, client_1.createRoot)(document.getElementById("root")).render(<react_query_1.QueryClientProvider client={queryClient}>
      <react_redux_1.Provider store={store_ts_1.store}>
        <react_router_dom_1.BrowserRouter>
          <App_tsx_1.default />
        </react_router_dom_1.BrowserRouter>
      </react_redux_1.Provider>
    </react_query_1.QueryClientProvider>);
