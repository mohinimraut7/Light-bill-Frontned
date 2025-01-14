import { FETCH_TARRIFFS_REQUEST,
    FETCH_TARRIFFS_SUCCESS,
    FETCH_TARRIFFS_ERROR,
    ADD_TARRIFF_REQUEST,
    ADD_TARRIFF_SUCCESS,
    ADD_TARRIFF_ERROR,
    EDIT_TARRIFF_REQUEST,
  EDIT_TARRIFF_SUCCESS,
  EDIT_TARRIFF_ERROR,
    DELETE_TARRIFF_REQUEST,
    DELETE_TARRIFF_SUCCESS,
    DELETE_TARRIFF_ERROR
 } from "../actions/tarriffActions";
const initialState={
    tarriffs:[],
    loading:false,
    error:null
}
const tarriffReducer=(state=initialState,action)=>{
switch(action.type){
    case FETCH_TARRIFFS_REQUEST:
    case ADD_TARRIFF_REQUEST:
        case EDIT_TARRIFF_REQUEST:
    case DELETE_TARRIFF_REQUEST:
    return {
        ...state,
        loading:true,
        error:null
    }

    case FETCH_TARRIFFS_SUCCESS:
        return {
            ...state,
            loading:false,
            tarriffs:action.payload
        }
        case ADD_TARRIFF_SUCCESS:
            return {
                ...state,
                loading: false,
                tarriffs: [...state.tarriffs, action.payload],
            };

            case EDIT_TARRIFF_SUCCESS:
                return {
                    
                  ...state,
                  loading: false,
                  tarriffs: state.tarriffs.map(tarriff =>
                    tarriff._id === action.payload._id ? action.payload :tarriff
                  ),
                };
            case DELETE_TARRIFF_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    tarriffs: state.tarriffs.filter(tarriff => tarriff._id !== action.payload),
                };
        case FETCH_TARRIFFS_ERROR:
        case ADD_TARRIFF_ERROR:
        case EDIT_TARRIFF_ERROR:
        case DELETE_TARRIFF_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
            default:
                return state;
}
}

export default tarriffReducer;