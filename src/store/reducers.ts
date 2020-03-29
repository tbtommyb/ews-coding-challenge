import { combineReducers } from "redux";
import { TradeState, ActionTypes, CREATE_TRADE } from "./types";

const initialState: TradeState = {
  trades: []
};

function trades(state = initialState, action: ActionTypes): TradeState {
  switch (action.type) {
    case CREATE_TRADE:
      return {
        trades: [...state.trades, action.payload]
      };
    default:
      return state;
  }
}

const rootReducer = combineReducers({ tradeState: trades });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
