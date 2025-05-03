import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '../../config/config';
export const FETCH_REPORTS_REQUEST = 'FETCH_REPORTS_REQUEST';
export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_ERROR = 'FETCH_REPORTS_ERROR';

export const ADD_REPORT_REMARK_REQUEST = 'ADD_REPORT_REMARK_REQUEST';

export const ADD_REPORT_REMARK_SUCCESS = 'ADD_REPORT_REMARK_SUCCESS';
export const ADD_REPORT_REMARK_ERROR = 'ADD_REPORT_REMARK_ERROR';

const getToken = () => {
  const resdata = JSON.parse(localStorage.getItem('resdata'));
  return resdata ? resdata.token : null;
};
export const fetchReportsRequest = () => ({
  type: FETCH_REPORTS_REQUEST
});
export const fetchReportsSuccess = (reports) => ({
  type: FETCH_REPORTS_SUCCESS,
  payload: reports
});
export const fetchReportsFailure = (error) => ({
  type: FETCH_REPORTS_ERROR,
  payload: error.message
});
export const fetchReports = () => {
    return async (dispatch) => {
      dispatch(fetchReportsRequest());
      try {
        const response = await axios.get(`${baseUrl}/getReports`);
        dispatch(fetchReportsSuccess(response.data));
      } catch (error) {
        dispatch(fetchReportsFailure(error.message));
      }
    };
  };
  
export const addReportRequest = () => ({
  type: ADD_REPORT_REMARK_REQUEST,
})
export const addReportSuccess = (report) => ({
  type:ADD_REPORT_REMARK_SUCCESS,
  payload: report
})
export const addReportFailure = (error) => ({
  type:ADD_REPORT_REMARK_ERROR,
  payload: error.message
})
  export const addReport = (reportData) => {
    return async (dispatch) => {
      dispatch(addReportRequest());
      try {
        const token = getToken();
        const response = await axios.post(`${baseUrl}/addRemarkReport`, reportData  );
        dispatch(addReportSuccess(response.data.report))
        console.log("response.data.report",response.data.report)
        toast.success(response?.data?.report?.status, { position: "top-center" });
        dispatch(fetchReports());
      } catch (error) {
        dispatch(addReportFailure(error));
        toast.error(error.response?.data?.message || "Error adding report", { position: "top-center" });
      }
    }
  }
