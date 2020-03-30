import React from "react";
import { fireEvent } from "@testing-library/react";

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

test("changing the amount updates the form correctly", () => {
  const { getByRole, getByLabelText } = renderWithRedux(
    <TradeForm instruments={instruments} salesPersons={[]} />
  );

  const form = getByRole("form");
  const amount = getByLabelText("Amount:");
  fireEvent.change(amount, { target: { value: 100 } });

  expect(form).toHaveFormValues({ amount: 100 });
});

test("shows validation errors", () => {
  const { getByTitle, getByText } = renderWithRedux(
    <TradeForm instruments={instruments} salesPersons={sales} />
  );

  const errors = getByTitle("validationErrors");
  const submit = getByText("Submit");
  fireEvent.click(submit);

  expect(errors).toHaveTextContent(
    "Level must be above 0.0, Amount must be above 0.0"
  );
});
