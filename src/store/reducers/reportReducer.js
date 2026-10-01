
import {
    ADD_REPORT_REMARK_REQUEST,
    ADD_REPORT_REMARK_SUCCESS,
    ADD_REPORT_REMARK_ERROR,
  } from '../actions/reportActions';
  
  const initialState = {
    reports: [],
    loading: false,
    error: null
  };
  
  const reportReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_REPORT_REMARK_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
  
      case ADD_REPORT_REMARK_SUCCESS:
        return {
          ...state,
          loading: false,
          reports: state.reports.map(report =>
            report._id === action.payload._id ? action.payload : report
          )
        };
  
      case ADD_REPORT_REMARK_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
  
      default:
        return state;
    }
  };
  
  export default reportReducer;