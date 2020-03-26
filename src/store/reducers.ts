import { combineReducers } from "redux";
import { InstrumentState, CurrencyState } from "./types";

const initialInstruments: InstrumentState = [];
const initialCurrencies: CurrencyState = [];

function instruments(state = initialInstruments, _action: any): InstrumentState {
  return state;
}

function currencies(state = initialCurrencies, _action: any): CurrencyState {
  return state;
}

const rootReducer = combineReducers({ instruments, currencies });
export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
