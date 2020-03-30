import React from "react";
import { fireEvent, within } from "@testing-library/react";

import TradeForm from "./TradeForm";
import { renderWithRedux } from "../utils/testHelpers";

import instruments from "../data/instruments.json";
import sales from "../data/salesPersons.json";

test("selects the first instrument by default", () => {
  const { getByRole } = renderWithRedux(
    <TradeForm instruments={instruments} salesPersons={[]} />
  );
  const form = getByRole("form");

  expect(form).toHaveFormValues({ instrument: instruments[0].id });
});

test("selects the first instrument by default", () => {
  const { getByRole } = renderWithRedux(
    <TradeForm instruments={[]} salesPersons={sales} />
  );
  const form = getByRole("form");

  expect(form).toHaveFormValues({ salesPerson: sales[0].id });
});

test("shows validation errors", async () => {
  const { getByText } = renderWithRedux(
    <TradeForm instruments={instruments} salesPersons={sales} />
  );

  const submit = getByText("Submit").parentNode;
  fireEvent.click(submit);

  const errors = await within(document).getByTitle("notifications");
  expect(errors).toHaveTextContent(
    "Level must be above 0.0, Amount must be above 0.0"
  );
});

describe("creating trades", () => {
  test("dispatches a valid trade", () => {
    const mockDispatch = jest.fn();
    const { getByLabelText, getByText, store } = renderWithRedux(
        <TradeForm instruments={instruments} salesPersons={sales} />
    );
    store.dispatch = mockDispatch
    const amount = getByLabelText("Amount:");
    const level = getByLabelText("Level ($)");
    fireEvent.change(amount, { target: { value: 100 } });
    fireEvent.change(level, { target: { value: 1000 } });

    const submit = getByText("Submit").parentNode;
    fireEvent.click(submit);

    expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
      type: "CREATE_TRADE_REQUEST",
      payload: {
        amount: 100,
        id: expect.any(String),
        instrument: {
          currency: {
            sign: "$",
            code: "USD",
          },
          id: "1",
          name: "Share"
        },
        level: {
          type: "Price",
          value: 1000
        },
        salesPerson: {
          desk: "Front",
          id: "1",
          lineOfBusiness: "trading",
          name: "Sam Sales"
        }
      }
    }));
  });
});
