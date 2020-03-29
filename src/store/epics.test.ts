import { TestScheduler } from "rxjs/testing";
import { createTradeRequest, setLoading, createTradeSuccess } from "./actions";
import tradesEpic from "./epics";

const testTrade = {
  instrument: {
    id: "1",
    name: "Test",
    currency: {
      sign: "$",
      code: "USD"
    }
  },
  salesPerson: {
    id: "1",
    name: "Sales",
    desk: "Desk",
    lineOfBusiness: "lob"
  },
  level: {
    value: 123,
    type: "Price"
  },
  amount: 100,
  id: "123"
};

const testScheduler = new TestScheduler((actual, expected) => {
  expect(actual).toEqual(expected);
});

test("it dispatches SET_IS_LOADING immediately then CREATE_TRADE_SUCCESS after 1s", () => {
  testScheduler.run(({ hot, cold, expectObservable }) => {
    const action$ = hot("a", {
      a: createTradeRequest(testTrade)
    });
    const state$ = null;
    const dependencies = null;

    const output$ = tradesEpic(action$, state$, dependencies);

    expectObservable(output$).toBe("a 999ms b", {
      a: setLoading(),
      b: createTradeSuccess(testTrade)
    });
  });
});
