import { combineReducers } from "redux";
import postReducer from "./postReducer";
import userReducer from "./userReducer";
import sidebarReducer from "./sidebarReducer";
import roleReducer from "./roleReducer";
import meterReducer from "./meterReducer";
import loginReducer from "./loginReducer";
import billReducer from "./billReducer";
import masterReducer from "./masterReducer";
import tarriffReducer from "./tarriffReducer";

const rootReducer=combineReducers({
    posts:postReducer,
    users:userReducer,
    sidebar:sidebarReducer,
    roles:roleReducer,
    meters:meterReducer,
    tarriffs:tarriffReducer,
    auth:loginReducer,
    bills:billReducer,
    masters:masterReducer
});

export default rootReducer;
