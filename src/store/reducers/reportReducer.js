// import { FETCH_REPORTS_REQUEST,FETCH_REPORTS_SUCCESS,FETCH_REPORTS_ERROR,
//     ADD_REPORT_REQUEST,ADD_REPORT_SUCCESS,ADD_REPORT_ERROR,
//     EDIT_REPORT_REQUEST,
//   EDIT_REPORT_SUCCESS,
//   EDIT_REPORT_ERROR,
//     UPDATE_REPORT_STATUS_SUCCESS,
//     UPDATE_REPORT_STATUS_ERROR,DELETE_REPORT_REQUEST,
//     DELETE_REPORT_SUCCESS,
//     DELETE_REPORT_ERROR,UPDATE_REPORT_FLAG_REQUEST,UPDATE_REPORT_FLAG_SUCCESS,UPDATE_REPORT_FLAG_ERROR,
//     UPDATE_MASSREPORTS_STATUS_REQUEST, UPDATE_MASSREPORTS_STATUS_SUCCESS, UPDATE_MASSREPORTS_STATUS_ERROR

//   } from '../actions/reportActions';
  
//   const initialState = {
//     reports: [],
//     loading: false,
//     error: null
//   };
  
//   const reportReducer = (state = initialState, action) => {
//     switch (action.type) {
//       case FETCH_REPORTS_REQUEST:
//         case ADD_REPORT_REQUEST:
//           case EDIT_REPORT_REQUEST:
//           case DELETE_REPORT_REQUEST:
//             case UPDATE_REPORT_FLAG_REQUEST:
//               case UPDATE_MASSREPORTS_STATUS_REQUEST:
//         return {
//           ...state,
//           loading: true,
//           error: null
//         };
//       case FETCH_REPORTS_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           reports: action.payload,
//         };
//         case ADD_REPORT_SUCCESS:
//           return {
//               ...state,
//               loading: false,
//               reports: [...state.reports, action.payload],
//           };
//           case EDIT_REPORT_SUCCESS:
//       console.log("Editing report:", action.payload);

//       return {
//         ...state,
//         loading: false,
//         reports: state.reports.map(report =>
//             report._id === action.payload._id ? action.payload : report
//         ),
//       };

//           case DELETE_REPORT_SUCCESS:
//             return {
//               ...state,
//               loading: false,
//               reports: state.reports.filter(report => report._id !== action.payload),
//             };
        
   
  
//   case UPDATE_REPORT_STATUS_SUCCESS:
//   return {
//     ...state,
//     loading: false,
//     reports: state.bills.map(bill =>
//         report._id === action.payload.id
//         ? {
//             ...report,
//             approvedStatus: action.payload.approvedStatus,
//             paymentStatus: action.payload.paymentStatus,
//             yesno: action.payload.yesno,
            
//           }
//         : report
//     ),
//   };

//   case UPDATE_REPORT_FLAG_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         reports: state.reports.map(report =>
//             report._id === action.payload.reportId
//             ? { ...report, reportId:action.payload.reportId,flagStatus: action.payload.flagStatus }
//             : report
//         ),
//       };

//       // Add this case to handle mass report approval success
//       case UPDATE_MASSREPORTS_STATUS_SUCCESS:
//         return {
//           ...state,
//           loading: false,
//           reports: state.reports.map(report => {
//             // Ensure action.payload is defined and is an array
//             if (Array.isArray(action.payload)) {
//               const updatedReport = action.payload.find(updated => updated._id === report._id);
//               return updatedReport ? { ...report, ...updatedReport } : report;
//             }
//             return report;  // If action.payload is not an array, return the original bill
//           })
//         };
      
//   case FETCH_REPORTS_ERROR:
//         case ADD_REPORT_ERROR:
//           case EDIT_REPORT_ERROR:
//           case UPDATE_REPORT_STATUS_ERROR:
//             case DELETE_REPORT_ERROR:
//               case UPDATE_REPORT_FLAG_ERROR:
//                 case UPDATE_MASSREPORTS_STATUS_ERROR:
//         return {
//           ...state,
//           loading: false,
//           error: action.payload
//         };
//       default:
//         return state;
//     }
//   };
  
//   export default reportReducer;
//   ===================================================
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