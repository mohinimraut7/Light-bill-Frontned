import axios from 'axios';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { baseUrl } from '../../config/config';
export const FETCH_REPORTS_REQUEST = 'FETCH_REPORTS_REQUEST';
export const FETCH_REPORTS_SUCCESS = 'FETCH_REPORTS_SUCCESS';
export const FETCH_REPORTS_ERROR = 'FETCH_REPORTS_ERROR';

export const ADD_REPORT_REQUEST = 'ADD_REPORT_REQUEST';
export const ADD_REPORT_SUCCESS = 'ADD_REPORT_SUCCESS';
export const ADD_REPORT_ERROR = 'ADD_REPORT_ERROR';

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
  