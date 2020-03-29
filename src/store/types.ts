import Trade from "../types/Trade";

export interface TradeState {
  trades: Trade[];
  pending?: Trade;
}

export interface SystemState {
  isLoading: boolean;
}

export const CREATE_TRADE_REQUEST = "CREATE_TRADE_REQUEST";
export const CREATE_TRADE_SUCCESS = "CREATE_TRADE_SUCCESS";
export const SET_IS_LOADING = "SET_IS_LOADING";

interface CreateTradeRequestAction {
  type: typeof CREATE_TRADE_REQUEST;
  payload: Trade;
}

interface CreateTradeSuccessAction {
  type: typeof CREATE_TRADE_SUCCESS;
  payload: Trade;
}

interface SetIsLoadingAction {
  type: typeof SET_IS_LOADING;
  payload: boolean;
}

export type ActionTypes = CreateTradeRequestAction | CreateTradeSuccessAction | SetIsLoadingAction;
