import axios from 'axios';
import {baseUrl} from '../../config/config';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FETCH_TARRIFFS_REQUEST='FETCH_TARRIFFS_REQUEST';
export const FETCH_TARRIFFS_SUCCESS='FETCH_TARRIFFS_SUCCESS';
export const FETCH_TARRIFFS_ERROR='FETCH_TARRIFFS_ERROR';

export const ADD_TARRIFF_REQUEST='ADD_TARRIFF_REQUEST';
export const ADD_TARRIFF_SUCCESS='ADD_TARRIFF_SUCCESS';
export const ADD_TARRIFF_ERROR='ADD_TARRIFF_ERROR';

export const EDIT_TARRIFF_REQUEST='EDIT_TARRIFF_REQUEST';
export const EDIT_TARRIFF_SUCCESS='EDIT_TARRIFF_SUCCESS';
export const EDIT_TARRIFF_ERROR='EDIT_TARRIFF_ERROR';

export const DELETE_TARRIFF_REQUEST='DELETE_TARRIFF_REQUEST';
export const DELETE_TARRIFF_SUCCESS='DELETE_TARRIFF_SUCCESS';
export const DELETE_TARRIFF_ERROR='DELETE_TARRIFF_ERROR';

  const getToken = () => {
    const resdata = JSON.parse(localStorage.getItem('resdata'));
    return resdata ? resdata.token : null;
  };

export const fetchTarriffsRequest=()=>({
    type:FETCH_TARRIFFS_REQUEST,
})

export const fetchTarriffsSuccess=(tarriffs)=>({
    type:FETCH_TARRIFFS_SUCCESS,
    payload:tarriffs
})

export const fetchTarriffsFailure=(error)=>({
    type:FETCH_TARRIFFS_ERROR,
    payload:error.message
})

export const fetchTarriffs=()=>{
    return async (dispatch)=>{
    dispatch(fetchTarriffsRequest());
    try{
        const response=await axios.get(`${baseUrl}/getTarriffs`);
        dispatch(fetchTarriffsSuccess(response.data));
    }catch(error){
        dispatch(fetchTarriffsFailure(error.message));
    }
    }
}

export const addTarriffRequest=()=>({
    type:ADD_TARRIFF_REQUEST,
})

export const addTarriffSuccess=(tarriff)=>({
    type:ADD_TARRIFF_SUCCESS,
    payload:tarriff
})
export const addTarriffFailure=(error)=>({
type:ADD_TARRIFF_ERROR,
payload:error.message
})

export const addTarriff = (tarriffData) => {
    return async (dispatch) => {
        dispatch(addTarriffRequest());
        try {

            const token = getToken();
            const response = await axios.post(`${baseUrl}/addTarriff`, tarriffData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            dispatch(addTarriffSuccess(response.data.Tarriff));
            toast.dismiss(); 
            toast.success("Tarriff added successfully", { position: "top-center" });
            dispatch(fetchTarriffs());
        } catch (error) {
            dispatch(addTarriffFailure(error.message));
            toast.dismiss(); 
            if (error.response?.status === 400 && error.response?.data?.message === 'Tarriff already exists') {
                toast.error("Tarriff already exists. Please choose a different name.", { position: "top-center" });
            } else {
                toast.error(error.response?.data?.message || "Error adding tarriff", { position: "top-center" });
            }
        }
    };
};

export const editTarriffRequest = () => ({
    type: EDIT_TARRIFF_REQUEST,
  });
  
  export const editTarriffSuccess = (tarriff) => ({
    type: EDIT_TARRIFF_SUCCESS,
    payload: tarriff,
  });
  
  export const editTarriffFailure = (error) => ({
    type: EDIT_TARRIFF_ERROR,
    payload: error.message,
  });
  

export const editTarriff = (tarriffId,tarriffData) => {
  
    return async (dispatch) => {
      dispatch(editTarriffRequest());
      try {
        const token = getToken();
            const response = await axios.post(`${baseUrl}/editTarriff/${tarriffId}`,tarriffData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      
        const updatedTarriff = response.data.tarrifff;
        dispatch(editTarriffSuccess(updatedTarriff));
        toast.success("Tarrifff Updated Successfully", { position: "top-center" });
      } catch (error) {
        dispatch(editTarriffFailure(error.message));
      }
    };
  };

export const deleteTarriffRequest = () => ({
    
    type: DELETE_TARRIFF_REQUEST,
});

export const deleteTarriffSuccess = (tarriff_id) => ({
    type: DELETE_TARRIFF_SUCCESS,
    payload: tarriff_id,
});

export const deleteTarriffFailure = (error) => ({
    type: DELETE_TARRIFF_ERROR,
    payload: error.message,
});

export const deleteTarriff = (tarriff_id) => {
    return async (dispatch) => {
        dispatch(deleteTarriffRequest());
        try {
            await axios.delete(`${baseUrl}/deleteTarriff/${tarriff_id}`);
            dispatch(deleteTarriffSuccess(tarriff_id));
            toast.success("Tarriff deleted successfully", { position: "top-center" });
        } catch (error) {
            dispatch(deleteTarriffFailure(error.message));
        }
    };
};