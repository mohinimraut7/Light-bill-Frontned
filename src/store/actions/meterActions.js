import axios from 'axios';
import {baseUrl} from '../../config/config';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FETCH_METERS_REQUEST='FETCH_METERS_REQUEST';
export const FETCH_METERS_SUCCESS='FETCH_METERS_SUCCESS';
export const FETCH_METERS_ERROR='FETCH_METERS_ERROR';

export const ADD_METER_REQUEST='ADD_METER_REQUEST';
export const ADD_METER_SUCCESS='ADD_METER_SUCCESS';
export const ADD_METER_ERROR='ADD_METER_ERROR';

export const EDIT_METER_REQUEST='EDIT_METER_REQUEST';
export const EDIT_METER_SUCCESS='EDIT_METER_SUCCESS';
export const EDIT_METER_ERROR='EDIT_METER_ERROR';

export const DELETE_METER_REQUEST='DELETE_METER_REQUEST';
export const DELETE_METER_SUCCESS='DELETE_METER_SUCCESS';
export const DELETE_METER_ERROR='DELETE_METER_ERROR';

  const getToken = () => {
    const resdata = JSON.parse(localStorage.getItem('resdata'));
    return resdata ? resdata.token : null;
  };

export const fetchMetersRequest=()=>({
    type:FETCH_METERS_REQUEST,
})

export const fetchMetersSuccess=(meters)=>({
    type:FETCH_METERS_SUCCESS,
    payload:meters
})

export const fetchMetersFailure=(error)=>({
    type:FETCH_METERS_ERROR,
    payload:error.message
})

export const fetchMeters=()=>{
    return async (dispatch)=>{
    dispatch(fetchMetersRequest());
    try{
        const response=await axios.get(`${baseUrl}/getMeters`);
        dispatch(fetchMetersSuccess(response.data));
    }catch(error){
        dispatch(fetchMetersFailure(error.message));
    }
    }
}

export const addMeterRequest=()=>({
    type:ADD_METER_REQUEST,
})

export const addMeterSuccess=(meter)=>({
    type:ADD_METER_SUCCESS,
    payload:meter
})
export const addMeterFailure=(error)=>({
type:ADD_METER_ERROR,
payload:error.message
})

export const addMeter = (meterData) => {
    return async (dispatch) => {
        dispatch(addMeterRequest());
        try {

            const token = getToken();
            const response = await axios.post(`${baseUrl}/addMeter`, meterData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            dispatch(addMeterSuccess(response.data.Meter));
            toast.dismiss(); 
            toast.success("Meter added successfully", { position: "top-center" });
            dispatch(fetchMeters());
        } catch (error) {
            dispatch(addMeterFailure(error.message));
            toast.dismiss(); 
            if (error.response?.status === 400 && error.response?.data?.message === 'Meter already exists') {
                toast.error("Meter already exists. Please choose a different name.", { position: "top-center" });
            } else {
                toast.error(error.response?.data?.message || "Error adding meter", { position: "top-center" });
            }
        }
    };
};

export const editMeterRequest = () => ({
    type: EDIT_METER_REQUEST,
  });
  
  export const editMeterSuccess = (meter) => ({
    type: EDIT_METER_SUCCESS,
    payload: meter,
  });
  
  export const editMeterFailure = (error) => ({
    type: EDIT_METER_ERROR,
    payload: error.message,
  });
  

export const editMeter = (meterId, meterData) => {
  
    return async (dispatch) => {
      dispatch(editMeterRequest());
      try {
        const token = getToken();
            const response = await axios.post(`${baseUrl}/editMeter/${meterId}`,meterData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        
        const updatedMeter = response.data.meter;
        dispatch(editMeterSuccess(updatedMeter));
        toast.success("Meter Updated Successfully", { position: "top-center" });
      } catch (error) {
        dispatch(editMeterFailure(error.message));
      }
    };
  };

export const deleteMeterRequest = () => ({
    
    type: DELETE_METER_REQUEST,
});

export const deleteMeterSuccess = (meter_id) => ({
    type: DELETE_METER_SUCCESS,
    payload: meter_id,
});

export const deleteMeterFailure = (error) => ({
    type: DELETE_METER_ERROR,
    payload: error.message,
});

export const deleteMeter = (meter_id) => {
    return async (dispatch) => {
        dispatch(deleteMeterRequest());
        try {
            await axios.delete(`${baseUrl}/deleteMeter/${meter_id}`);
            dispatch(deleteMeterSuccess(meter_id));
            toast.success("Meter deleted successfully", { position: "top-center" });
        } catch (error) {
            dispatch(deleteMeterFailure(error.message));
        }
    };
};