import { trades, system } from "./reducers";
import { createTradeRequest, createTradeSuccess, setLoading } from "./actions";

describe("trades reducer", () => {
  it("should return the initial state", () => {
    expect(trades(undefined, {})).toEqual({
      trades: [],
      pending: undefined
    });
  });

  it("adds a pending trade on CREATE_TRADE_REQUEST", () => {
    let trade = { amount: 100, id: "1" };
    expect(trades(undefined, createTradeRequest(trade))).toEqual({
      trades: [],
      pending: trade
    });
  });

  it("prepends the trade on CREATE_TRADE_SUCCESS", () => {
    let first = { amount: 100, id: "1" };
    let second = { amount: 100, id: "2" };
    const state = {
      trades: [first],
      pending: second
    };

    expect(trades(state, createTradeSuccess(second))).toEqual({
      trades: [second, first],
      pending: undefined
    });
  });
});

describe("system reducer", () => {
  it("should return the initial state", () => {
    expect(system(undefined, {})).toEqual({
      isLoading: false
    });
  });

  it("should set the loading status", () => {
    expect(system(undefined, setLoading(true))).toEqual({
      isLoading: true
    });
  });
});
