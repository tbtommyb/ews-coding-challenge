import Trade from "../types/Trade";

export interface AppState {
  trades: Trade[]
}

export const CREATE_TRADE = 'CREATE_TRADE';

interface CreateTradeAction {
  type: typeof CREATE_TRADE
  payload: Trade
}

export type ActionTypes = CreateTradeAction;

