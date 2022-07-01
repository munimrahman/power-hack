import axios from 'axios';
import {
  ALL_BILLINGS_REQUEST,
  ALL_BILLINGS_SUCCESS,
  ALL_BILLINGS_FAIL,
  NEW_BILLING_REQUEST,
  NEW_BILLING_SUCCESS,
  NEW_BILLING_FAIL,
  DELETE_BILLING_REQUEST,
  DELETE_BILLING_SUCCESS,
  DELETE_BILLING_FAIL,
  UPDATE_BILLING_REQUEST,
  UPDATE_BILLING_SUCCESS,
  UPDATE_BILLING_FAIL,
  CLEAR_ERRORS,
} from '../constants/billingConstants';

// Get all billings
export const getBillings =
  (keyword = '', currentPage = 1) =>
  async (dispatch) => {
    try {
      dispatch({ type: ALL_BILLINGS_REQUEST });

      let url = `/api/billing-list?keyword=${keyword}&page=${currentPage}`;

      const { data } = await axios.get(url);
      dispatch({ type: ALL_BILLINGS_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: ALL_BILLINGS_FAIL,
        payload: error.response.data.message,
      });
    }
  };

// Add new billing
export const addNewBilling = (billing) => async (dispatch) => {
  try {
    dispatch({ type: NEW_BILLING_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('/api/add-billing', billing, config);
    dispatch({ type: NEW_BILLING_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: NEW_BILLING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Delete billing
export const deleteBilling = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_BILLING_REQUEST });
    const { data } = await axios.delete(`/api/delete-billing/${id}`);
    dispatch({ type: DELETE_BILLING_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: DELETE_BILLING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update billing
export const updateBillingData = (id, billing) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_BILLING_REQUEST });

    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.put(
      `/api/update-billing/${id}`,
      billing,
      config
    );
    dispatch({ type: UPDATE_BILLING_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: UPDATE_BILLING_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clear errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
