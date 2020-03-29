import { combineReducers } from "redux";
import {
  TradeState,
  SystemState,
  ActionTypes,
  CREATE_TRADE_REQUEST,
  CREATE_TRADE_SUCCESS,
  SET_IS_LOADING
} from "./types";

const initialTradeState: TradeState = {
  trades: [],
  pending: undefined
};

const initialSystemState: SystemState = {
  isLoading: false
};

function trades(state = initialTradeState, action: ActionTypes): TradeState {
  switch (action.type) {
    case CREATE_TRADE_SUCCESS:
      return {
        ...state,
        trades: [...state.trades, action.payload],
        pending: undefined
      };
    case CREATE_TRADE_REQUEST:
      return {
        ...state,
        pending: action.payload
      };
    default:
      return state;
  }
}

function system(state = initialSystemState, action: ActionTypes): SystemState {
  switch (action.type) {
    case SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };
    case CREATE_TRADE_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  tradeState: trades,
  systemState: system
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
