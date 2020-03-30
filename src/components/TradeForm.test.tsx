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

describe("validation", () => {
  test("shows messages for insufficient amount and level", async () => {
    const { getByText } = renderWithRedux(
        <TradeForm instruments={instruments} salesPersons={sales} />
    );

    const submit = getByText("Submit").parentNode;
    fireEvent.click(submit);

    const errors = await within(document).getByTitle("notifications");
    expect(errors).toHaveTextContent("Minimum amount for Share is 100");
    expect(errors).toHaveTextContent("Amount must be above 0.0");
    expect(errors).toHaveTextContent("Level must be above 0.0");
  });

  test("does not allow trades below minimum tradeable amount", async () => {
    const { getByLabelText, getByText } = renderWithRedux(
        <TradeForm instruments={instruments} salesPersons={sales} />
    );
    const amount = getByLabelText("Amount:");
    const level = getByLabelText("Level ($)");
    fireEvent.change(amount, { target: { value: 10 } });
    fireEvent.change(level, { target: { value: 1000 } });

    const submit = getByText("Submit").parentNode;
    fireEvent.click(submit);

    const errors = await within(document).getByTitle("notifications");
    expect(errors).toHaveTextContent("Minimum amount for Share is 100");
  });

  test("does not allow trades without sales person", async () => {
    const { getByLabelText, getByText } = renderWithRedux(
        <TradeForm instruments={instruments} salesPersons={[]} />
    );
    const amount = getByLabelText("Amount:");
    const level = getByLabelText("Level ($)");
    fireEvent.change(amount, { target: { value: 1000 } });
    fireEvent.change(level, { target: { value: 1000 } });

    const submit = getByText("Submit").parentNode;
    fireEvent.click(submit);

    const errors = await within(document).getByTitle("notifications");
    expect(errors).toHaveTextContent("Sales person must be selected");
  });

  test("does not allow trades without instrument", async () => {
    const { getByLabelText, getByText } = renderWithRedux(
        <TradeForm instruments={[]} salesPersons={sales} />
    );
    const amount = getByLabelText("Amount:");
    const level = getByLabelText("Level ($)");
    fireEvent.change(amount, { target: { value: 1000 } });
    fireEvent.change(level, { target: { value: 1000 } });

    const submit = getByText("Submit").parentNode;
    fireEvent.click(submit);

    const errors = await within(document).getByTitle("notifications");
    expect(errors).toHaveTextContent("Instrument must be selected");
  });
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
        level: {
          type: "Price",
          value: 1000
        },
        id: expect.any(String),
        instrument: expect.any(Object),
        salesPerson: expect.any(Object)
      }
    }));
  });
});
