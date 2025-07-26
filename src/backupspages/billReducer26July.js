//Before server pagination
import { FETCH_BILLS_REQUEST,FETCH_BILLS_SUCCESS,FETCH_BILLS_ERROR,
    ADD_BILL_REQUEST,ADD_BILL_SUCCESS,ADD_BILL_ERROR,
    EDIT_BILL_REQUEST,
  EDIT_BILL_SUCCESS,
  EDIT_BILL_ERROR,
    UPDATE_BILL_STATUS_SUCCESS,
    UPDATE_BILL_STATUS_ERROR,DELETE_BILL_REQUEST,
    DELETE_BILL_SUCCESS,
    DELETE_BILL_ERROR,UPDATE_BILL_FLAG_REQUEST,UPDATE_BILL_FLAG_SUCCESS,UPDATE_BILL_FLAG_ERROR,
    UPDATE_MASSBILLS_STATUS_REQUEST, UPDATE_MASSBILLS_STATUS_SUCCESS, UPDATE_MASSBILLS_STATUS_ERROR,SET_TOTAL_BILLS_COUNT

  } from '../actions/billActions';
  
  const initialState = {
    bills: [],
    total: 0,
    loading: false,
    error: null,
  };
  
  const billReducer = (state = initialState, action) => {
    switch (action.type) {
      case FETCH_BILLS_REQUEST:
        case ADD_BILL_REQUEST:
          case EDIT_BILL_REQUEST:
          case DELETE_BILL_REQUEST:
            case UPDATE_BILL_FLAG_REQUEST:
              case UPDATE_MASSBILLS_STATUS_REQUEST:
        return {
          ...state,
          loading: true,
          error: null
        };
      // case FETCH_BILLS_SUCCESS:
      //   return {
      //     ...state,
      //     loading: false,
      //     bills: action.payload,
      //   };


case FETCH_BILLS_SUCCESS:
  return {
    ...state,
    loading: false,
    bills: action.payload,                     // ✅ keep as-is (array only)
    total: Array.isArray(action.payload)       
      ? action.payload.length                  // ✅ if array, count length
      : state.total,                           // ✅ if not array, keep old total
  };


 

  //       case SET_TOTAL_BILLS_COUNT:
  // return {
  //   ...state,
  //   total: action.payload, // ✅ set total here
  // };

        case ADD_BILL_SUCCESS:
          return {
              ...state,
              loading: false,
              bills: [...state.bills, action.payload],
          };
          case EDIT_BILL_SUCCESS:
      console.log("Editing bill:", action.payload);

      return {
        ...state,
        loading: false,
        bills: state.bills.map(bill =>
          bill._id === action.payload._id ? action.payload : bill
        ),
      };

          case DELETE_BILL_SUCCESS:
            return {
              ...state,
              loading: false,
              bills: state.bills.filter(bill => bill._id !== action.payload),
            };
        
   
  
  case UPDATE_BILL_STATUS_SUCCESS:
  return {
    ...state,
    loading: false,
    bills: state.bills.map(bill =>
      bill._id === action.payload.id
        ? {
            ...bill,
            approvedStatus: action.payload.approvedStatus,
            paymentStatus: action.payload.paymentStatus,
            yesno: action.payload.yesno,
            
          }
        : bill
    ),
  };

  case UPDATE_BILL_FLAG_SUCCESS:
      return {
        ...state,
        loading: false,
        bills: state.bills.map(bill =>
          bill._id === action.payload.billId
            ? { ...bill, billId:action.payload.billId,flagStatus: action.payload.flagStatus }
            : bill
        ),
      };

      
      case UPDATE_MASSBILLS_STATUS_SUCCESS:
        return {
          ...state,
          loading: false,
          bills: state.bills.map(bill => {
          
            if (Array.isArray(action.payload)) {
              const updatedBill = action.payload.find(updated => updated._id === bill._id);
              return updatedBill ? { ...bill, ...updatedBill } : bill;
            }
            return bill;  
          })
        };
      
  case FETCH_BILLS_ERROR:
        case ADD_BILL_ERROR:
          case EDIT_BILL_ERROR:
          case UPDATE_BILL_STATUS_ERROR:
            case DELETE_BILL_ERROR:
              case UPDATE_BILL_FLAG_ERROR:
                case UPDATE_MASSBILLS_STATUS_ERROR:
        return {
          ...state,
          loading: false,
          error: action.payload
        };
      default:
        return state;
    }
  };
  
  export default billReducer;
  

// =======================================

//After server pagination

// import { 
//   FETCH_BILLS_REQUEST, FETCH_BILLS_SUCCESS, FETCH_BILLS_ERROR,
//   ADD_BILL_REQUEST, ADD_BILL_SUCCESS, ADD_BILL_ERROR,
//   EDIT_BILL_REQUEST, EDIT_BILL_SUCCESS, EDIT_BILL_ERROR,
//   UPDATE_BILL_STATUS_SUCCESS, UPDATE_BILL_STATUS_ERROR, 
//   DELETE_BILL_REQUEST, DELETE_BILL_SUCCESS, DELETE_BILL_ERROR,
//   UPDATE_BILL_FLAG_REQUEST, UPDATE_BILL_FLAG_SUCCESS, UPDATE_BILL_FLAG_ERROR,
//   UPDATE_MASSBILLS_STATUS_REQUEST, UPDATE_MASSBILLS_STATUS_SUCCESS, UPDATE_MASSBILLS_STATUS_ERROR,
//   UPDATE_MASSBILLS_ROLLBACK_REQUEST, UPDATE_MASSBILLS_ROLLBACK_SUCCESS, UPDATE_MASSBILLS_ROLLBACK_ERROR
// } from '../actions/billActions';

// const initialState = {
//   bills: [],
//   loading: false,
//   error: null,
//   totalCount: 0,
//   currentPage: 0,
//   hasMore: true
// };

// const billReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case FETCH_BILLS_REQUEST:
//     case ADD_BILL_REQUEST:
//     case EDIT_BILL_REQUEST:
//     case DELETE_BILL_REQUEST:
//     case UPDATE_BILL_FLAG_REQUEST:
//     case UPDATE_MASSBILLS_STATUS_REQUEST:
//     case UPDATE_MASSBILLS_ROLLBACK_REQUEST:
//       return {
//         ...state,
//         loading: true,
//         error: null
//       };

//     case FETCH_BILLS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         bills: action.payload.bills || action.payload,
//         totalCount: action.payload.totalCount || 0,
//         currentPage: action.payload.currentPage || 0,
//         hasMore: action.payload.hasMore || false
//       };

//     case ADD_BILL_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         bills: [...state.bills, action.payload],
//         totalCount: state.totalCount + 1
//       };

//     case EDIT_BILL_SUCCESS:
//       console.log("Editing bill:", action.payload);
//       return {
//         ...state,
//         loading: false,
//         bills: state.bills.map(bill =>
//           bill._id === action.payload._id ? action.payload : bill
//         ),
//       };

//     case DELETE_BILL_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         bills: state.bills.filter(bill => bill._id !== action.payload),
//         totalCount: state.totalCount - 1
//       };

//     case UPDATE_BILL_STATUS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         bills: state.bills.map(bill =>
//           bill._id === action.payload.id
//             ? {
//                 ...bill,
//                 approvedStatus: action.payload.approvedStatus,
//                 paymentStatus: action.payload.paymentStatus,
//                 yesno: action.payload.yesno,
//               }
//             : bill
//         ),
//       };

//     case UPDATE_BILL_FLAG_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         bills: state.bills.map(bill =>
//           bill._id === action.payload.billId
//             ? { ...bill, billId: action.payload.billId, flagStatus: action.payload.flagStatus }
//             : bill
//         ),
//       };

//     case UPDATE_MASSBILLS_STATUS_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         bills: state.bills.map(bill => {
//           if (Array.isArray(action.payload)) {
//             const updatedBill = action.payload.find(updated => updated._id === bill._id);
//             return updatedBill ? { ...bill, ...updatedBill } : bill;
//           }
//           return bill;
//         })
//       };

//     case UPDATE_MASSBILLS_ROLLBACK_SUCCESS:
//       return {
//         ...state,
//         loading: false,
//         bills: state.bills.map(bill => {
//           if (Array.isArray(action.payload)) {
//             const rolledBackBill = action.payload.find(rolled => rolled._id === bill._id);
//             return rolledBackBill ? { ...bill, ...rolledBackBill } : bill;
//           }
//           return bill;
//         })
//       };

//     case FETCH_BILLS_ERROR:
//     case ADD_BILL_ERROR:
//     case EDIT_BILL_ERROR:
//     case UPDATE_BILL_STATUS_ERROR:
//     case DELETE_BILL_ERROR:
//     case UPDATE_BILL_FLAG_ERROR:
//     case UPDATE_MASSBILLS_STATUS_ERROR:
//     case UPDATE_MASSBILLS_ROLLBACK_ERROR:
//       return {
//         ...state,
//         loading: false,
//         error: action.payload
//       };

//     default:
//       return state;
//   }
// };

// export default billReducer;