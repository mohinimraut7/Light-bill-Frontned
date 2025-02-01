import axios from 'axios';
import {baseUrl} from '../../config/config';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const FETCH_CONSUMERS_REQUEST='FETCH_CONSUMERS_REQUEST';
export const FETCH_CONSUMERS_SUCCESS='FETCH_CONSUMERS_SUCCESS';
export const FETCH_CONSUMERS_ERROR='FETCH_CONSUMERS_ERROR';

export const ADD_CONSUMER_REQUEST='ADD_CONSUMER_REQUEST';
export const ADD_CONSUMER_SUCCESS='ADD_CONSUMER_SUCCESS';
export const ADD_CONSUMER_ERROR='ADD_CONSUMER_ERROR';

export const EDIT_CONSUMER_REQUEST='EDIT_CONSUMER_REQUEST';
export const EDIT_CONSUMER_SUCCESS='EDIT_CONSUMER_SUCCESS';
export const EDIT_CONSUMER_ERROR='EDIT_CONSUMER_ERROR';

export const DELETE_CONSUMER_REQUEST='DELETE_CONSUMER_REQUEST';
export const DELETE_CONSUMER_SUCCESS='DELETE_CONSUMER_SUCCESS';
export const DELETE_CONSUMER_ERROR='DELETE_CONSUMER_ERROR';

  const getToken = () => {
    const resdata = JSON.parse(localStorage.getItem('resdata'));
    return resdata ? resdata.token : null;
  };

export const fetchConsumersRequest=()=>({
    type:FETCH_CONSUMERS_REQUEST,
})

export const fetchConsumersSuccess=(consumers)=>({
    type:FETCH_CONSUMERS_SUCCESS,
    payload:consumers
})

export const fetchConsumersFailure=(error)=>({
    type:FETCH_CONSUMERS_ERROR,
    payload:error.message
})

export const fetchConsumers=()=>{
    return async (dispatch)=>{
    dispatch(fetchConsumersRequest());
    try{
        const response=await axios.get(`${baseUrl}/getConsumers`);
        dispatch(fetchConsumersSuccess(response.data));
    }catch(error){
        dispatch(fetchConsumersFailure(error.message));
    }
    }
}

export const addConsumerRequest=()=>({
    type:ADD_CONSUMER_REQUEST,
})

export const addConsumerSuccess=(consumer)=>({
    type:ADD_CONSUMER_SUCCESS,
    payload:consumer
})
export const addConsumerFailure=(error)=>({
type:ADD_CONSUMER_ERROR,
payload:error.message
})

export const addConsumer = (consumerData) => {
    return async (dispatch) => {
        dispatch(addConsumerRequest());
        try {

            const token = getToken();
            const response = await axios.post(`${baseUrl}/addConsumer`,consumerData, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
    
            dispatch(addConsumerSuccess(response.data.Consumer));
            toast.dismiss(); 
            toast.success("Consumer added successfully", { position: "top-center" });
            dispatch(fetchConsumers());
        } catch (error) {
            dispatch(addConsumerFailure(error.message));
            toast.dismiss(); 
            if (error.response?.status === 400 && error.response?.data?.message === 'Consumer already exists') {
                toast.error("Consumer already exists.", { position: "top-center" });
            } else {
                toast.error(error.response?.data?.message || "Error adding meter", { position: "top-center" });
            }
        }
    };
};

export const editConsumerRequest = () => ({
    type: EDIT_CONSUMER_REQUEST,
  });
  
  export const editConsumerSuccess = (consumer) => ({
    type: EDIT_CONSUMER_SUCCESS,
    payload:consumer,
  });
  
  export const editConsumerFailure = (error) => ({
    type: EDIT_CONSUMER_ERROR,
    payload: error.message,
  });
  

export const editConsumer = (consumerId,consumerData) => {
  
    return async (dispatch) => {
      dispatch(editConsumerRequest());
      try {
        const token = getToken();
            const response = await axios.put(`${baseUrl}/editConsumer/${consumerId}`,consumerData,{
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        
        const updatedConsumer = response.data.consumer;
        dispatch(editConsumerSuccess(updatedConsumer));
        toast.success("Consumer Updated Successfully", { position: "top-center" });
      } catch (error) {
        dispatch(editConsumerFailure(error.message));
      }
    };
  };

export const deleteConsumerRequest = () => ({
    
    type: DELETE_CONSUMER_REQUEST,
});

export const deleteConsumersSuccess = (consumer_id) => ({
    type: DELETE_CONSUMER_SUCCESS,
    payload:consumer_id,
});

export const deleteConsumersFailure = (error) => ({
    type: DELETE_CONSUMER_ERROR,
    payload: error.message,
});

export const deleteConsumer = (consumer_id) => {
    return async (dispatch) => {
        dispatch(deleteConsumerRequest());
        try {
            await axios.delete(`${baseUrl}/deleteConsumer/${consumer_id}`);
            dispatch(deleteConsumersSuccess(consumer_id));
            toast.success("Consumer deleted successfully", { position: "top-center" });
        } catch (error) {
            dispatch(deleteConsumersFailure(error.message));
        }
    };
};