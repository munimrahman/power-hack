import {
  ALL_BILLINGS_REQUEST,
  ALL_BILLINGS_SUCCESS,
  ALL_BILLINGS_FAIL,
  NEW_BILLING_REQUEST,
  NEW_BILLING_SUCCESS,
  NEW_BILLING_RESET,
  NEW_BILLING_FAIL,
  DELETE_BILLING_REQUEST,
  DELETE_BILLING_SUCCESS,
  DELETE_BILLING_RESET,
  DELETE_BILLING_FAIL,
  UPDATE_BILLING_REQUEST,
  UPDATE_BILLING_SUCCESS,
  UPDATE_BILLING_RESET,
  UPDATE_BILLING_FAIL,
  CLEAR_ERRORS,
} from '../constants/billingConstants';

export const billingsReducer = (state = { billings: [] }, action) => {
  switch (action.type) {
    case ALL_BILLINGS_REQUEST:
      return {
        loading: true,
        billings: [],
      };
    case ALL_BILLINGS_SUCCESS:
      return {
        loading: false,
        billings: action.payload.billings,
        billingsCount: action.payload.billingsCount,
        resPerPage: action.payload.resPerPage,
        filteredBillingsCount: action.payload.filteredBillingsCount,
        totalPaidAmount: action.payload.totalPaidAmount,
      };
    case ALL_BILLINGS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const newBillingReducer = (state = { billing: {} }, action) => {
  switch (action.type) {
    case NEW_BILLING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case NEW_BILLING_SUCCESS:
      return {
        loading: false,
        success: action.payload.success,
        billing: action.payload.billing,
      };
    case NEW_BILLING_RESET:
      return {
        ...state,
        success: false,
      };
    case NEW_BILLING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

export const billingActionReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_BILLING_REQUEST:
    case UPDATE_BILLING_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_BILLING_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case DELETE_BILLING_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload,
      };
    case UPDATE_BILLING_RESET:
      return {
        ...state,
        isUpdated: false,
      };
    case DELETE_BILLING_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case UPDATE_BILLING_FAIL:
    case DELETE_BILLING_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};
