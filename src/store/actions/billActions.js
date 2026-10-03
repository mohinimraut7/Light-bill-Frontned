// import axios from 'axios';
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { baseUrl } from '../../config/config';
// export const FETCH_BILLS_REQUEST = 'FETCH_BILLS_REQUEST';
// export const FETCH_BILLS_SUCCESS = 'FETCH_BILLS_SUCCESS';
// export const FETCH_BILLS_ERROR = 'FETCH_BILLS_ERROR';

// export const ADD_BILL_REQUEST = 'ADD_BILL_REQUEST';
// export const ADD_BILL_SUCCESS = 'ADD_BILL_SUCCESS';
// export const ADD_BILL_ERROR = 'ADD_BILL_ERROR';

// export const EDIT_BILL_REQUEST = 'EDIT_BILL_REQUEST';
// export const EDIT_BILL_SUCCESS = 'EDIT_BILL_SUCCESS';
// export const EDIT_BILL_ERROR = 'EDIT_BILL_ERROR';

// export const UPDATE_BILL_STATUS_REQUEST = 'UPDATE_BILL_STATUS_REQUEST';
// export const UPDATE_BILL_STATUS_SUCCESS = 'UPDATE_BILL_STATUS_SUCCESS';
// export const UPDATE_BILL_STATUS_ERROR = 'UPDATE_BILL_STATUS_ERROR';

// export const UPDATE_MASSBILLS_STATUS_REQUEST = 'UPDATE_MASSBILLS_STATUS_REQUEST';
// export const UPDATE_MASSBILLS_STATUS_SUCCESS = 'UPDATE_MASSBILLS_STATUS_SUCCESS';
// export const UPDATE_MASSBILLS_STATUS_ERROR = 'UPDATE_MASSBILLS_STATUS_ERROR';

// export const UPDATE_MASSBILLS_ROLLBACK_REQUEST = 'UPDATE_MASSBILLS_ROLLBACK_REQUEST';
// export const UPDATE_MASSBILLS_ROLLBACK_SUCCESS = 'UPDATE_MASSBILLS_ROLLBACK_SUCCESS';
// export const UPDATE_MASSBILLS_ROLLBACK_ERROR = 'UPDATE_MASSBILLS_ROLLBACK_ERROR';

// export const DELETE_BILL_REQUEST = 'DELETE_BILL_REQUEST';
// export const DELETE_BILL_SUCCESS = 'DELETE_BILL_SUCCESS';
// export const DELETE_BILL_ERROR = 'DELETE_BILL_ERROR';

// export const UPDATE_BILL_FLAG_REQUEST = 'UPDATE_BILL_FLAG_REQUEST';
// export const UPDATE_BILL_FLAG_SUCCESS = 'UPDATE_BILL_FLAG_SUCCESS';
// export const UPDATE_BILL_FLAG_ERROR = 'UPDATE_BILL_FLAG_ERROR';

// export const FETCH_OVERDUE_BILLS_REQUEST ='FETCH_OVERDUE_BILLS_REQUEST';
// export const FETCH_OVERDUE_BILLS_SUCCESS ='FETCH_OVERDUE_BILLS_SUCCESS';
// export const FETCH_OVERDUE_BILLS_ERROR = 'FETCH_OVERDUE_BILLS_ERROR';


// export const SET_ALL_BILLS_FOR_REPORT = "SET_ALL_BILLS_FOR_REPORT";

// const getToken = () => {
//   const resdata = JSON.parse(localStorage.getItem('resdata'));
//   return resdata ? resdata.token : null;
// };
// export const fetchBillsRequest = () => ({
//   type: FETCH_BILLS_REQUEST
// });
// export const fetchBillsSuccess = (bills) => ({
//   type: FETCH_BILLS_SUCCESS,
//   payload: bills
// });
// export const fetchBillsFailure = (error) => ({
//   type: FETCH_BILLS_ERROR,
//   payload: error.message
// });



// export const fetchOverdueBillsRequest = () => ({
//   type: FETCH_OVERDUE_BILLS_REQUEST
// });

// export const fetchOverdueBillsSuccess = (data) => ({
//   type: FETCH_OVERDUE_BILLS_SUCCESS,
//   payload: data
// });

// export const fetchOverdueBillsFailure = (error) => ({
//   type: FETCH_OVERDUE_BILLS_ERROR,
//   payload: error
// });



// // export const fetchBills = (page = 1, limit = 10, filters = {}) => {
// //   return async (dispatch) => {
// //     dispatch(fetchBillsRequest());
// //     try {
// //       // If any filter is applied, fetch all records from page 1
// //       let effectiveLimit = limit;
// //       let effectivePage = page;

// //       if (filters.selectedMonthYear || filters.consumerNumber || filters.wardName) {
// //         // effectiveLimit = 10000; // Set a very high limit to get all bills
// //         effectivePage = 1; // Always fetch from page 1 when filters are applied
// //       }

// //       let queryParams = `page=${effectivePage}&limit=${effectiveLimit}`;

// //       if (filters.selectedMonthYear) {
// //         queryParams += `&selectedMonthYear=${encodeURIComponent(filters.selectedMonthYear)}`;
// //       }

// //       if (filters.consumerNumber) {
// //         queryParams += `&consumerNumber=${encodeURIComponent(filters.consumerNumber)}`;
// //       }

// //       if (filters.wardName) {
// //         queryParams += `&wardName=${encodeURIComponent(filters.wardName)}`;
// //       }

// //       const response = await axios.get(`${baseUrl}/getBills?${queryParams}`);
// //       dispatch(fetchBillsSuccess(response.data));
// //     } catch (error) {
// //       dispatch(fetchBillsFailure(error.message));
// //     }
// //   };
// // };




// export const fetchBills = (page = 1, limit = 10000, filters = {}, fetchAll = false) => {
//  return async (dispatch) => {
//  dispatch(fetchBillsRequest());
//  try {
//  // If fetchAll is true, set a very high limit to get all records
//  let effectiveLimit = fetchAll ? 10000 : limit;
//  let effectivePage = fetchAll ? 1 : page;

//  let queryParams = `page=${effectivePage}&limit=${effectiveLimit}`;

//  if (filters.selectedMonthYear) {
//  queryParams += `&selectedMonthYear=${encodeURIComponent(filters.selectedMonthYear)}`;
//  }

//  if (filters.consumerNumber) {
//  queryParams += `&consumerNumber=${encodeURIComponent(filters.consumerNumber)}`;
//  }

//  if (filters.wardName) {
//  queryParams += `&wardName=${encodeURIComponent(filters.wardName)}`;
//  }

//  const response = await axios.get(`${baseUrl}/getBills?${queryParams}`);


//  dispatch(fetchBillsSuccess(response.data));
// // dispatch(fetchBillsSuccess({
// //   ...response.data,
// //   fetchAll
// // }))


// if (fetchAll) {
//   dispatch(setAllBillsForReport(response.data.bills));
// }

//  } catch (error) {
//  dispatch(fetchBillsFailure(error.message));
//  }
//  };
// };



// export const fetchOverdueBills = (page = 1, limit = 50, selectedMonthYear) => {
//   return async (dispatch) => {
//     dispatch(fetchOverdueBillsRequest());
//     try {
//       // If selectedMonthYear is provided, fetch all records from page 1
//       let effectiveLimit = limit;
//       let effectivePage = page;

//       if (selectedMonthYear) {
//         effectiveLimit = 10000; // Set a very high limit to get all overdue bills for the selected month
//         effectivePage = 1; // Always fetch from page 1 when filter is applied
//       }

//       let queryParams = `page=${effectivePage}&limit=${effectiveLimit}`;
//       if (selectedMonthYear) {
//         queryParams += `&selectedMonthYear=${encodeURIComponent(selectedMonthYear)}`;
//       }

//       const response = await axios.get(`${baseUrl}/getBillsOverdue?${queryParams}`);
//       dispatch(fetchOverdueBillsSuccess(response.data));
//     } catch (error) {
//       dispatch(fetchOverdueBillsFailure(error.message));
//     }
//   };
// };

// export const addBillRequest = () => ({
//   type: ADD_BILL_REQUEST,
// })
// export const addBillSuccess = (bill) => ({
//   type: ADD_BILL_SUCCESS,
//   payload: bill
// })
// export const addBillFailure = (error) => ({
//   type: ADD_BILL_ERROR,
//   payload: error.message
// })
// export const editBillRequest = () => ({
//   type: EDIT_BILL_REQUEST,
// });
// export const editBillSuccess = (bill) => ({
//   type: EDIT_BILL_SUCCESS,
//   payload: bill,
// });
// export const editBillFailure = (error) => ({
//   type: EDIT_BILL_ERROR,
//   payload: error.message,
// });
// export const editBill = (billId, billData) => {
//   return async (dispatch) => {
//     dispatch(editBillRequest());
//     try {
//       const token = getToken();
//       const response = await axios.put(`${baseUrl}/editBill/${billId}`, billData, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       });
//       dispatch(editBillSuccess(response.data.bill));
//       toast.success("Bill Updated Successfully", { position: "top-center" });
//     } catch (error) {
//       dispatch(editBillFailure(error.response?.data?.message || "Error updating bill"));
//       toast.error(error.response?.data?.message || "Error updating bill", { position: "top-center" });
//     }
//   };
// };
// export const updateBillFlagRequest = () => ({
//   type: UPDATE_BILL_FLAG_REQUEST,
// })
// export const updateBillFlagSuccess = (bill) => ({
//   type: UPDATE_BILL_FLAG_SUCCESS,
//   payload: bill
// })
// export const updateBillFlagFailure = (error) => ({
//   type: UPDATE_BILL_FLAG_ERROR,
//   payload: error.message
// })

// export const addBill = (billData) => {
//   return async (dispatch) => {
//     dispatch(addBillRequest());
//     try {
//       const token = getToken();
//       const response = await axios.post(`${baseUrl}/addBill`, billData
//         , {
//         // headers: {
//         //   Authorization: `Bearer ${token}`
//         // }
//         headers: {
//           vvcmcsaaviinfinet: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTZmYmI3NjZkMWYxNWY1OGM0NTNhYiIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTczODk5ODIyMywiZXhwIjoxNzQxNTkwMjIzfQ.YQRt7Kj4-eRejrs-G073tvzLdM_9oQDOYuQYmxSWsgs"
//         }
//       }
//       );
//       dispatch(addBillSuccess(response.data.bill))
//       console.log("response.data.bill",response.data.bill)
//       toast.success(response?.data?.bill?.status, { position: "top-center" });
//       dispatch(fetchBills());
//     } catch (error) {
//       dispatch(addBillFailure(error));
//       toast.error(error.response?.data?.message || "Error adding lightbill", { position: "top-center" });
//     }
//   }
// }

// export const updateBillStatusAction = (id, approvedStatus, paymentStatus, yesno) => async (dispatch) => {
//   try {
//     const token = getToken();
//     const response = await axios.put(`${baseUrl}/updateBillStatus`, {
//       id, approvedStatus, paymentStatus, yesno
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     dispatch({
//       type: 'UPDATE_BILL_STATUS_SUCCESS',
//       payload: { id, approvedStatus, paymentStatus, yesno },
//     });
//     dispatch(fetchBills());
//   } catch (error) {
//     dispatch({
//       type: 'UPDATE_BILL_STATUS_FAIL',
//       payload: error.message,
//     });
//   }
// };
// export const massBillApprovalsAction = (bills) => async (dispatch) => {
//   dispatch({ type: UPDATE_MASSBILLS_STATUS_REQUEST });

//   try {
//     const token = getToken();
//     const response = await axios.put(`${baseUrl}/massUpdateBillStatus`, { bills }, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     if (response.status === 200) {
//       dispatch({
//         type: UPDATE_MASSBILLS_STATUS_SUCCESS
//       });
//       toast.success("Mass bill approvals updated successfully", { position: "top-center" });
//       dispatch(fetchBills());
//     } else {
//       throw new Error('Failed to update mass bill approvals');
//     }

//   } catch (error) {
//     dispatch({
//       type: UPDATE_MASSBILLS_STATUS_ERROR,
//       payload: error.message,
//     });
//     toast.error(error.message, { position: "top-center" });
//   }
// };
// export const massBillRollbackApprovalsAction = (bills) => async (dispatch) => {
//   dispatch({ type: UPDATE_MASSBILLS_ROLLBACK_REQUEST });
//   try {
//     const token = getToken();
//     const response = await axios.put(`${baseUrl}/reverseMassBillStatus`, { bills }, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     if (response.status === 200) {
//       dispatch({
//         type: UPDATE_MASSBILLS_ROLLBACK_SUCCESS
//       });
//       toast.success("Mass bills Rollback updated successfully", { position: "top-center" });
//       dispatch(fetchBills());
//     } else {
//       throw new Error('Failed to update mass bill approvals');
//     }
//   } catch (error) {
//     dispatch({
//       type: UPDATE_MASSBILLS_ROLLBACK_ERROR,
//       payload: error.message,
//     });
//     toast.error(error.message, { position: "top-center" });
//   }
// };

// export const updateFlagStatus = (billId, flagStatus) => async (dispatch) => {
//   dispatch(updateBillFlagRequest());
//   try {
//     const token = getToken();
//     const response = await axios.put(`${baseUrl}/updateFlagStatus`, {
//       billId,
//       flagStatus
//     }, {
//       headers: {
//         Authorization: `Bearer ${token}`
//       }
//     });
//     dispatch(updateBillFlagSuccess({ billId, flagStatus }));
//     toast.success("Bill flag status updated successfully", { position: "top-center" });
//   } catch (error) {
//     dispatch(updateBillFlagFailure(error.message));
//     toast.error(error.response?.data?.message || "Error updating bill flag status", { position: "top-center" });
//   }
// };
// export const deleteBillRequest = () => ({
//   type: DELETE_BILL_REQUEST,
// });
// export const deleteBillSuccess = (bill_id) => ({
//   type: DELETE_BILL_SUCCESS,
//   payload: bill_id,
// });
// export const deleteBillFailure = (error) => ({
//   type: DELETE_BILL_ERROR,
//   payload: error.message,
// });
// export const deleteBill = (bill_id) => {
//   return async (dispatch) => {
//     dispatch(deleteBillRequest());
//     try {
//       const token = getToken();
//       const response = await axios.delete(`${baseUrl}/bill/${bill_id}`, {
//         headers: {
//           Authorization: `Bearer ${token}`
//         }
//       })
//       dispatch(deleteBillSuccess(bill_id));
//       toast.success("Bill deleted successfully", { position: "top-center" });
//     } catch (error) {
//       dispatch(deleteBillFailure(error.message));
//     }
//   };
// };


// export const setAllBillsForReport = (bills) => ({
//   type: SET_ALL_BILLS_FOR_REPORT,
//   payload: bills,
// });


// -------------------------------------------------------------------




import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '../../config/config';
export const FETCH_BILLS_REQUEST = 'FETCH_BILLS_REQUEST';
export const FETCH_BILLS_SUCCESS = 'FETCH_BILLS_SUCCESS';
export const FETCH_BILLS_ERROR = 'FETCH_BILLS_ERROR';

export const ADD_BILL_REQUEST = 'ADD_BILL_REQUEST';
export const ADD_BILL_SUCCESS = 'ADD_BILL_SUCCESS';
export const ADD_BILL_ERROR = 'ADD_BILL_ERROR';

export const EDIT_BILL_REQUEST = 'EDIT_BILL_REQUEST';
export const EDIT_BILL_SUCCESS = 'EDIT_BILL_SUCCESS';
export const EDIT_BILL_ERROR = 'EDIT_BILL_ERROR';

export const UPDATE_BILL_STATUS_REQUEST = 'UPDATE_BILL_STATUS_REQUEST';
export const UPDATE_BILL_STATUS_SUCCESS = 'UPDATE_BILL_STATUS_SUCCESS';
export const UPDATE_BILL_STATUS_ERROR = 'UPDATE_BILL_STATUS_ERROR';

export const UPDATE_MASSBILLS_STATUS_REQUEST = 'UPDATE_MASSBILLS_STATUS_REQUEST';
export const UPDATE_MASSBILLS_STATUS_SUCCESS = 'UPDATE_MASSBILLS_STATUS_SUCCESS';
export const UPDATE_MASSBILLS_STATUS_ERROR = 'UPDATE_MASSBILLS_STATUS_ERROR';

export const UPDATE_MASSBILLS_ROLLBACK_REQUEST = 'UPDATE_MASSBILLS_ROLLBACK_REQUEST';
export const UPDATE_MASSBILLS_ROLLBACK_SUCCESS = 'UPDATE_MASSBILLS_ROLLBACK_SUCCESS';
export const UPDATE_MASSBILLS_ROLLBACK_ERROR = 'UPDATE_MASSBILLS_ROLLBACK_ERROR';

export const DELETE_BILL_REQUEST = 'DELETE_BILL_REQUEST';
export const DELETE_BILL_SUCCESS = 'DELETE_BILL_SUCCESS';
export const DELETE_BILL_ERROR = 'DELETE_BILL_ERROR';

export const UPDATE_BILL_FLAG_REQUEST = 'UPDATE_BILL_FLAG_REQUEST';
export const UPDATE_BILL_FLAG_SUCCESS = 'UPDATE_BILL_FLAG_SUCCESS';
export const UPDATE_BILL_FLAG_ERROR = 'UPDATE_BILL_FLAG_ERROR';

export const FETCH_OVERDUE_BILLS_REQUEST ='FETCH_OVERDUE_BILLS_REQUEST';
export const FETCH_OVERDUE_BILLS_SUCCESS ='FETCH_OVERDUE_BILLS_SUCCESS';
export const FETCH_OVERDUE_BILLS_ERROR = 'FETCH_OVERDUE_BILLS_ERROR';


export const SET_ALL_BILLS_FOR_REPORT = "SET_ALL_BILLS_FOR_REPORT";

const getToken = () => {
  const resdata = JSON.parse(localStorage.getItem('resdata'));
  return resdata ? resdata.token : null;
};
export const fetchBillsRequest = () => ({
  type: FETCH_BILLS_REQUEST
});
export const fetchBillsSuccess = (bills) => ({
  type: FETCH_BILLS_SUCCESS,
  payload: bills
});
export const fetchBillsFailure = (error) => ({
  type: FETCH_BILLS_ERROR,
  payload: error.message
});



export const fetchOverdueBillsRequest = () => ({
  type: FETCH_OVERDUE_BILLS_REQUEST
});

export const fetchOverdueBillsSuccess = (data) => ({
  type: FETCH_OVERDUE_BILLS_SUCCESS,
  payload: data
});

export const fetchOverdueBillsFailure = (error) => ({
  type: FETCH_OVERDUE_BILLS_ERROR,
  payload: error
});



// export const fetchBills = (page = 1, limit = 10, filters = {}) => {
//   return async (dispatch) => {
//     dispatch(fetchBillsRequest());
//     try {
//       // If any filter is applied, fetch all records from page 1
//       let effectiveLimit = limit;
//       let effectivePage = page;

//       if (filters.selectedMonthYear || filters.consumerNumber || filters.wardName) {
//         // effectiveLimit = 10000; // Set a very high limit to get all bills
//         effectivePage = 1; // Always fetch from page 1 when filters are applied
//       }

//       let queryParams = `page=${effectivePage}&limit=${effectiveLimit}`;

//       if (filters.selectedMonthYear) {
//         queryParams += `&selectedMonthYear=${encodeURIComponent(filters.selectedMonthYear)}`;
//       }

//       if (filters.consumerNumber) {
//         queryParams += `&consumerNumber=${encodeURIComponent(filters.consumerNumber)}`;
//       }

//       if (filters.wardName) {
//         queryParams += `&wardName=${encodeURIComponent(filters.wardName)}`;
//       }

//       const response = await axios.get(`${baseUrl}/getBills?${queryParams}`);
//       dispatch(fetchBillsSuccess(response.data));
//     } catch (error) {
//       dispatch(fetchBillsFailure(error.message));
//     }
//   };
// };




// ===== OLD fetchBills (3-Oct-2026 पर्यंत active) — खाली नवीन version (तोच API call, तोच Redux result) =====
// export const fetchBills = (page = 1, limit = 10000, filters = {}, fetchAll = false) => {
//  return async (dispatch) => {
//  dispatch(fetchBillsRequest());
//  try {
//  // If fetchAll is true, set a very high limit to get all records
//  let effectiveLimit = fetchAll ? 10000 : limit;
//  let effectivePage = fetchAll ? 1 : page;

//  let queryParams = `page=${effectivePage}&limit=${effectiveLimit}`;

//  if (filters.selectedMonthYear) {
//  queryParams += `&selectedMonthYear=${encodeURIComponent(filters.selectedMonthYear)}`;
//  }

//  if (filters.consumerNumber) {
//  queryParams += `&consumerNumber=${encodeURIComponent(filters.consumerNumber)}`;
//  }

//  if (filters.wardName) {
//  queryParams += `&wardName=${encodeURIComponent(filters.wardName)}`;
//  }

//  const response = await axios.get(`${baseUrl}/getBills?${queryParams}`);


//  dispatch(fetchBillsSuccess(response.data));
// // dispatch(fetchBillsSuccess({
// //   ...response.data,
// //   fetchAll
// // }))


// if (fetchAll) {
//   dispatch(setAllBillsForReport(response.data.bills));
// }

//  } catch (error) {
//  dispatch(fetchBillsFailure(error.message));
//  }
//  };
// };

// ===== NEW fetchBills (3-Oct-2026) — request duplicate होऊ नये म्हणून =====
// समस्या: App.js, Sidebar.js, Home.js आणि प्रत्येक page mount वर fetchBills() call करतात.
// प्रत्येक call 10,000 bills download करत होता — एकाच वेळी 2-3 वेळा, आणि प्रत्येक page बदलताना पुन्हा.
// उपाय (API, parameters आणि Redux state अगदी तसेच):
//  1) तोच request आधीच चालू असेल तर नवीन request न पाठवता तोच वापरतो (in-flight dedupe).
//  2) शेवटचा यशस्वी request अगदी तसाच होता आणि BILLS_CACHE_MS च्या आत झाला असेल,
//     तर Redux मध्ये data आधीच आहे → पुन्हा download करत नाही.
//  3) कोणताही POST/PUT/DELETE (bill add/edit/approve/remark/delete...) झाला की cache
//     लगेच रद्द होतो → त्यानंतरचा fetchBills() नेहमी server वरून fresh data आणतो.
const BILLS_CACHE_MS = 30 * 1000;
let billsCacheGeneration = 0;   // invalidate झाल्यावर वाढतो
let billsInFlight = null;       // { key, generation, promise }
let billsLastSuccess = null;    // { key, generation, at }

export const invalidateBillsCache = () => {
  billsCacheGeneration += 1;
  billsInFlight = null;
  billsLastSuccess = null;
};

// Components मधून थेट axios.post/put/delete होतात (उदा. AddRemark) — ते सुद्धा पकडण्यासाठी.
// synchronous: true → request पाठवण्याआधीच cache रद्द होतो.
axios.interceptors.request.use(
  (config) => {
    const method = (config.method || 'get').toLowerCase();
    if (method !== 'get' && method !== 'head' && method !== 'options') {
      invalidateBillsCache();
    }
    return config;
  },
  null,
  { synchronous: true }
);

export const fetchBills = (page = 1, limit = 10000, filters = {}, fetchAll = false) => {
  return (dispatch) => {
    // If fetchAll is true, set a very high limit to get all records
    let effectiveLimit = fetchAll ? 10000 : limit;
    let effectivePage = fetchAll ? 1 : page;

    let queryParams = `page=${effectivePage}&limit=${effectiveLimit}`;
    if (filters.selectedMonthYear) {
      queryParams += `&selectedMonthYear=${encodeURIComponent(filters.selectedMonthYear)}`;
    }
    if (filters.consumerNumber) {
      queryParams += `&consumerNumber=${encodeURIComponent(filters.consumerNumber)}`;
    }
    if (filters.wardName) {
      queryParams += `&wardName=${encodeURIComponent(filters.wardName)}`;
    }

    const key = `${queryParams}|fetchAll=${fetchAll ? 1 : 0}`;
    const generation = billsCacheGeneration;

    // (1) तोच request आधीच चालू आहे
    if (billsInFlight && billsInFlight.key === key && billsInFlight.generation === generation) {
      return billsInFlight.promise;
    }

    // (2) Redux मध्ये आत्ताच आलेला अगदी हाच data आहे
    if (
      billsLastSuccess &&
      billsLastSuccess.key === key &&
      billsLastSuccess.generation === generation &&
      Date.now() - billsLastSuccess.at < BILLS_CACHE_MS
    ) {
      return Promise.resolve();
    }

    dispatch(fetchBillsRequest());

    const promise = (async () => {
      try {
        const response = await axios.get(`${baseUrl}/getBills?${queryParams}`);

        dispatch(fetchBillsSuccess(response.data));

        if (fetchAll) {
          dispatch(setAllBillsForReport(response.data.bills));
        }

        // invalidate नंतर आलेला जुना response cache म्हणून मानायचा नाही
        if (generation === billsCacheGeneration) {
          billsLastSuccess = { key, generation, at: Date.now() };
        }
      } catch (error) {
        dispatch(fetchBillsFailure(error.message));
      } finally {
        if (billsInFlight && billsInFlight.promise === promise) {
          billsInFlight = null;
        }
      }
    })();

    billsInFlight = { key, generation, promise };
    // दुसऱ्या key चा response शेवटी आला तर Redux मधील bills बदलतात → जुना cache वापरायचा नाही
    if (billsLastSuccess && billsLastSuccess.key !== key) {
      billsLastSuccess = null;
    }
    return promise;
  };
};



export const fetchOverdueBills = (page = 1, limit = 50, selectedMonthYear) => {
  return async (dispatch) => {
    // 3-Oct-2026: overdue response Redux मधील state.bills बदलतो → fetchBills cache रद्द
    invalidateBillsCache();
    dispatch(fetchOverdueBillsRequest());
    try {
      // If selectedMonthYear is provided, fetch all records from page 1
      let effectiveLimit = limit;
      let effectivePage = page;

      if (selectedMonthYear) {
        effectiveLimit = 10000; // Set a very high limit to get all overdue bills for the selected month
        effectivePage = 1; // Always fetch from page 1 when filter is applied
      }

      let queryParams = `page=${effectivePage}&limit=${effectiveLimit}`;
      if (selectedMonthYear) {
        queryParams += `&selectedMonthYear=${encodeURIComponent(selectedMonthYear)}`;
      }

      const response = await axios.get(`${baseUrl}/getBillsOverdue?${queryParams}`);
      dispatch(fetchOverdueBillsSuccess(response.data));
    } catch (error) {
      dispatch(fetchOverdueBillsFailure(error.message));
    }
  };
};

export const addBillRequest = () => ({
  type: ADD_BILL_REQUEST,
})
export const addBillSuccess = (bill) => ({
  type: ADD_BILL_SUCCESS,
  payload: bill
})
export const addBillFailure = (error) => ({
  type: ADD_BILL_ERROR,
  payload: error.message
})
export const editBillRequest = () => ({
  type: EDIT_BILL_REQUEST,
});
export const editBillSuccess = (bill) => ({
  type: EDIT_BILL_SUCCESS,
  payload: bill,
});
export const editBillFailure = (error) => ({
  type: EDIT_BILL_ERROR,
  payload: error.message,
});
export const editBill = (billId, billData) => {
  return async (dispatch) => {
    dispatch(editBillRequest());
    try {
      const token = getToken();
      const response = await axios.put(`${baseUrl}/editBill/${billId}`, billData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(editBillSuccess(response.data.bill));
      toast.success("Bill Updated Successfully", { position: "top-center" });
    } catch (error) {
      dispatch(editBillFailure(error.response?.data?.message || "Error updating bill"));
      toast.error(error.response?.data?.message || "Error updating bill", { position: "top-center" });
    }
  };
};
export const updateBillFlagRequest = () => ({
  type: UPDATE_BILL_FLAG_REQUEST,
})
export const updateBillFlagSuccess = (bill) => ({
  type: UPDATE_BILL_FLAG_SUCCESS,
  payload: bill
})
export const updateBillFlagFailure = (error) => ({
  type: UPDATE_BILL_FLAG_ERROR,
  payload: error.message
})

export const addBill = (billData) => {
  return async (dispatch) => {
    dispatch(addBillRequest());
    try {
      const token = getToken();
      const response = await axios.post(`${baseUrl}/addBill`, billData
        , {
        // headers: {
        //   Authorization: `Bearer ${token}`
        // }
        headers: {
          vvcmcsaaviinfinet: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YTZmYmI3NjZkMWYxNWY1OGM0NTNhYiIsInJvbGUiOiJTdXBlciBBZG1pbiIsImlhdCI6MTczODk5ODIyMywiZXhwIjoxNzQxNTkwMjIzfQ.YQRt7Kj4-eRejrs-G073tvzLdM_9oQDOYuQYmxSWsgs"
        }
      }
      );
      dispatch(addBillSuccess(response.data.bill))
      console.log("response.data.bill",response.data.bill)
      toast.success(response?.data?.bill?.status, { position: "top-center" });
      dispatch(fetchBills());
    } catch (error) {
      dispatch(addBillFailure(error));
      toast.error(error.response?.data?.message || "Error adding lightbill", { position: "top-center" });
    }
  }
}

export const updateBillStatusAction = (id, approvedStatus, paymentStatus, yesno) => async (dispatch) => {
  try {
    const token = getToken();
    const response = await axios.put(`${baseUrl}/updateBillStatus`, {
      id, approvedStatus, paymentStatus, yesno
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch({
      type: 'UPDATE_BILL_STATUS_SUCCESS',
      payload: { id, approvedStatus, paymentStatus, yesno },
    });
    dispatch(fetchBills());
  } catch (error) {
    dispatch({
      type: 'UPDATE_BILL_STATUS_FAIL',
      payload: error.message,
    });
  }
};
export const massBillApprovalsAction = (bills) => async (dispatch) => {
  dispatch({ type: UPDATE_MASSBILLS_STATUS_REQUEST });

  try {
    const token = getToken();
    const response = await axios.put(`${baseUrl}/massUpdateBillStatus`, { bills }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (response.status === 200) {
      dispatch({
        type: UPDATE_MASSBILLS_STATUS_SUCCESS
      });
      toast.success("Mass bill approvals updated successfully", { position: "top-center" });
      dispatch(fetchBills());
    } else {
      throw new Error('Failed to update mass bill approvals');
    }

  } catch (error) {
    dispatch({
      type: UPDATE_MASSBILLS_STATUS_ERROR,
      payload: error.message,
    });
    toast.error(error.message, { position: "top-center" });
  }
};
export const massBillRollbackApprovalsAction = (bills) => async (dispatch) => {
  dispatch({ type: UPDATE_MASSBILLS_ROLLBACK_REQUEST });
  try {
    const token = getToken();
    const response = await axios.put(`${baseUrl}/reverseMassBillStatus`, { bills }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if (response.status === 200) {
      dispatch({
        type: UPDATE_MASSBILLS_ROLLBACK_SUCCESS
      });
      toast.success("Mass bills Rollback updated successfully", { position: "top-center" });
      dispatch(fetchBills());
    } else {
      throw new Error('Failed to update mass bill approvals');
    }
  } catch (error) {
    dispatch({
      type: UPDATE_MASSBILLS_ROLLBACK_ERROR,
      payload: error.message,
    });
    toast.error(error.message, { position: "top-center" });
  }
};

export const updateFlagStatus = (billId, flagStatus) => async (dispatch) => {
  dispatch(updateBillFlagRequest());
  try {
    const token = getToken();
    const response = await axios.put(`${baseUrl}/updateFlagStatus`, {
      billId,
      flagStatus
    }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    dispatch(updateBillFlagSuccess({ billId, flagStatus }));
    toast.success("Bill flag status updated successfully", { position: "top-center" });
  } catch (error) {
    dispatch(updateBillFlagFailure(error.message));
    toast.error(error.response?.data?.message || "Error updating bill flag status", { position: "top-center" });
  }
};
export const deleteBillRequest = () => ({
  type: DELETE_BILL_REQUEST,
});
export const deleteBillSuccess = (bill_id) => ({
  type: DELETE_BILL_SUCCESS,
  payload: bill_id,
});
export const deleteBillFailure = (error) => ({
  type: DELETE_BILL_ERROR,
  payload: error.message,
});
export const deleteBill = (bill_id) => {
  return async (dispatch) => {
    dispatch(deleteBillRequest());
    try {
      const token = getToken();
      const response = await axios.delete(`${baseUrl}/bill/${bill_id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      dispatch(deleteBillSuccess(bill_id));
      toast.success("Bill deleted successfully", { position: "top-center" });
    } catch (error) {
      dispatch(deleteBillFailure(error.message));
    }
  };
};


export const setAllBillsForReport = (bills) => ({
  type: SET_ALL_BILLS_FOR_REPORT,
  payload: bills,
});


