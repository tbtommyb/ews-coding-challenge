import Trade from "../types/Trade";

export interface TradeState {
  trades: Trade[];
}

export const CREATE_TRADE = "CREATE_TRADE";

interface CreateTradeAction {
  type: typeof CREATE_TRADE;
  payload: Trade;
}

export type ActionTypes = CreateTradeAction;
