import { CREATE_TRADE, ActionTypes } from "./types";
import Trade from "../types/Trade";

export function createTrade(trade: Trade): ActionTypes {
  return {
    type: CREATE_TRADE,
    payload: trade
  }
}
