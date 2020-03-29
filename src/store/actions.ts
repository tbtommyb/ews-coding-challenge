import {
  CREATE_TRADE_REQUEST,
  CREATE_TRADE_SUCCESS,
  SET_IS_LOADING,
  ActionTypes
} from "./types";
import Trade from "../types/Trade";

export function createTradeRequest(trade: Trade): ActionTypes {
  return {
    type: CREATE_TRADE_REQUEST,
    payload: trade
  };
}

export function createTradeSuccess(trade: Trade): ActionTypes {
  return {
    type: CREATE_TRADE_SUCCESS,
    payload: trade
  };
}

export function setLoading(): ActionTypes {
  return {
    type: SET_IS_LOADING,
    payload: true
  };
}
