import { combineReducers } from "redux";
import { InstrumentState } from "./types";

const initialInstruments: InstrumentState = [];

function instruments(state = initialInstruments, _action: any): InstrumentState {
  return state;
}

const rootReducer = combineReducers({ instruments });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
