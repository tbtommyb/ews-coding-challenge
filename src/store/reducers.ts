import { combineReducers } from "redux";
import { TradeState } from "./types";

const initialTrades: TradeState = [];

function trades(state = initialTrades, _action: any): TradeState {
  return state;
}

const rootReducer = combineReducers({ trades });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
