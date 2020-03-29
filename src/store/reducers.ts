import { combineReducers } from "redux";
import { AppState, ActionTypes, CREATE_TRADE } from "./types";

const initialState: AppState = {
  trades: []
}

function trades(state = initialState, action: ActionTypes): AppState {
  switch(action.type) {
    case CREATE_TRADE:
      return {
        trades: [...state.trades, action.payload]
      }
    default:
      return state;
  }
}

const rootReducer = combineReducers({ tradeState: trades });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
