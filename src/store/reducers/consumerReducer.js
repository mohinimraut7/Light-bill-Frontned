import { FETCH_CONSUMERS_REQUEST,
    FETCH_CONSUMERS_SUCCESS,
    FETCH_CONSUMERS_ERROR,
    ADD_CONSUMER_REQUEST,
    ADD_CONSUMER_SUCCESS,
    ADD_CONSUMER_ERROR,
    EDIT_CONSUMER_REQUEST,
  EDIT_CONSUMER_SUCCESS,
  EDIT_CONSUMER_ERROR,
    DELETE_CONSUMER_REQUEST,
    DELETE_CONSUMER_SUCCESS,
    DELETE_CONSUMER_ERROR
 } from "../actions/consumerActions";
const initialState={
    consumers:[],
    loading:false,
    error:null
}
const consumerReducer=(state=initialState,action)=>{
switch(action.type){
    case FETCH_CONSUMERS_REQUEST:
    case ADD_CONSUMER_REQUEST:
        case EDIT_CONSUMER_REQUEST:
    case DELETE_CONSUMER_REQUEST:
    return {
        ...state,
        loading:true,
        error:null
    }

    case FETCH_CONSUMERS_SUCCESS:
        return {
            ...state,
            loading:false,
            consumers:action.payload
        }
        case ADD_CONSUMER_SUCCESS:
            return {
                ...state,
                loading: false,
                consumers: [...state.consumers, action.payload],
            };

            case EDIT_CONSUMER_SUCCESS:
                return {
                    
                  ...state,
                  loading: false,
                  consumers: state.consumers.map(consumer =>
                    consumer._id === action.payload._id ? action.payload : consumer
                  ),
                };
            case DELETE_CONSUMER_SUCCESS:
                return {
                    ...state,
                    loading: false,
                    consumers: state.consumers.filter(consumer => consumer._id !== action.payload),
                };
        case FETCH_CONSUMERS_ERROR:
        case ADD_CONSUMER_ERROR:
        case EDIT_CONSUMER_ERROR:
        case DELETE_CONSUMER_ERROR:
            return{
                ...state,
                loading:false,
                error:action.payload
            };
            default:
                return state;
}
}

export default consumerReducer;