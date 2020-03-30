import React from "react";
import { screen, fireEvent, within } from "@testing-library/react";

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
  test("submit is disabled when form is not valid", async () => {
    const { getByText, getByRole } = renderWithRedux(
        <TradeForm instruments={instruments} salesPersons={sales} />
    );

    const submit = getByText("Submit").parentNode;
    expect(submit).toBeDisabled();
  });

  test("shows messages for insufficient amount and level", async () => {
    const { getByText, getByRole } = renderWithRedux(
        <TradeForm instruments={instruments} salesPersons={sales} />
    );

    const form = getByRole("form")
    fireEvent.blur(form);

    expect(form).toHaveTextContent("Minimum amount for Share is 100");
    expect(form).toHaveTextContent("Amount must be above 0.0");
    expect(form).toHaveTextContent("Level must be above 0.0");
  });

  test("does not allow trades below minimum tradeable amount", async () => {
    const { getByLabelText, getByRole } = renderWithRedux(
        <TradeForm instruments={instruments} salesPersons={sales} />
    );
    const form = getByRole("form");
    const amount = getByLabelText("Amount:");
    fireEvent.change(amount, { target: { value: 10 } });
    fireEvent.blur(form);

    expect(form).toHaveTextContent("Minimum amount for Share is 100");
  });

  test("does not allow trades without sales person", async () => {
    const { getByLabelText, getByRole } = renderWithRedux(
        <TradeForm instruments={instruments} salesPersons={[]} />
    );
    const form = getByRole("form");
    const amount = getByLabelText("Amount:");
    const level = getByLabelText("Level ($)");
    fireEvent.change(amount, { target: { value: 1000 } });
    fireEvent.change(level, { target: { value: 1000 } });
    fireEvent.blur(form);

    expect(form).toHaveTextContent("Sales person must be selected");
  });

  test("does not allow trades without instrument", async () => {
    const { getByLabelText, getByRole } = renderWithRedux(
        <TradeForm instruments={[]} salesPersons={sales} />
    );
    const form = getByRole("form");
    const amount = getByLabelText("Amount:");
    const level = getByLabelText("Level ($)");
    fireEvent.change(amount, { target: { value: 1000 } });
    fireEvent.change(level, { target: { value: 1000 } });
    fireEvent.blur(form);

    expect(form).toHaveTextContent("Instrument must be selected");
  });
});

describe("creating trades", () => {
  test("dispatches a valid trade", () => {
    const mockDispatch = jest.fn();
    const { getByLabelText, getByText, getByRole, store } = renderWithRedux(
        <TradeForm instruments={instruments} salesPersons={sales} />
    );
    store.dispatch = mockDispatch

    const form = getByRole("form");
    const amount = getByLabelText("Amount:");
    const level = getByLabelText("Level ($)");

    fireEvent.change(amount, { target: { value: 100 } });
    fireEvent.change(level, { target: { value: 1000 } });
    fireEvent.blur(form);

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
