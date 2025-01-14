import { FETCH_METERS_REQUEST,
    FETCH_METERS_SUCCESS,
    FETCH_METERS_ERROR,
    ADD_METER_REQUEST,
    ADD_METER_SUCCESS,
    ADD_METER_ERROR,
    EDIT_METER_REQUEST,
  EDIT_METER_SUCCESS,
  EDIT_METER_ERROR,
    DELETE_METER_REQUEST,
    DELETE_METER_SUCCESS,
    DELETE_METER_ERROR
 } from "../actions/meterActions";
const initialState={
    meters:[],
    loading:false,
    error:null
}
const meterReducer=(state=initialState,action)=>{
switch(action.type){
    case FETCH_METERS_REQUEST:
    case ADD_METER_REQUEST:
        case EDIT_METER_REQUEST:
    case DELETE_METER_REQUEST:
    return {
        ...state,
        loading:true,
        error:null
    }

    case FETCH_METERS_SUCCESS:
        return {
            ...state,
            loading:false,
            meters:action.payload
        }
        case ADD_METER_SUCCESS:
            return {
                ...state,
                loading: false,
                meters: [...state.meters, action.payload],
            };

            case EDIT_METER_SUCCESS:
                return {
                    
                  ...state,
                  loading: false,
                  meters: state.meters.map(meter =>
                    meter._id === action.payload._id ? action.payload : meter
                  ),
                };
            case DELETE_METER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    meters: state.meters.filter(meter => meter._id !== action.payload),
                };
        case FETCH_METERS_ERROR:
        case ADD_METER_ERROR:
        case EDIT_METER_ERROR:
        case DELETE_METER_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
            default:
                return state;
}
}

export default meterReducer;