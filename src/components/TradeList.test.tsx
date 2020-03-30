import React from "react";
import { render } from "@testing-library/react";

import Trade from "../types/Trade";
import { LevelType } from "../types/Level";
import TradeList from "./TradeList";

const TRADES: Trade[] = [
  {
    amount: 100,
    level: {
      type: LevelType.Spread,
      value: 10.2
    },
    id: "123",
    salesPerson: {
      id: "1",
      name: "Sam Sales",
      lineOfBusiness: "Office",
      desk: "Big"
    },
    instrument: {
      id: "3",
      name: "Stock",
      currency: {
        code: "GBP",
        sign: "£"
      },
      minTradeable: 0.1,
      levelTypes: [LevelType.Spread]
    }
  }
];

test("it renders the trade", () => {
  const { getByText } = render(<TradeList trades={TRADES}/>);

  expect(getByText(TRADES[0].instrument.name)).not.toBeNull();
  expect(getByText(TRADES[0].salesPerson.name)).not.toBeNull();
  expect(getByText(new RegExp(TRADES[0].level.type))).not.toBeNull();
  expect(getByText(TRADES[0].amount.toString())).not.toBeNull();
});
