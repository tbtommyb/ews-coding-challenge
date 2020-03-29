import React from "react";
import { render, fireEvent } from "@testing-library/react";

import TradeForm from "./TradeForm";

import instruments from "../data/instruments.json";
import sales from "../data/salesPersons.json";

test("selects the first instrument by default", () => {
  const { getByRole } = render(
    <TradeForm instruments={instruments} salesPersons={[]} />
  );
  const form = getByRole("form");

  expect(form).toHaveFormValues({ instrument: instruments[0].id });
});

test("selects the first instrument by default", () => {
  const { getByRole } = render(
    <TradeForm instruments={[]} salesPersons={sales} />
  );
  const form = getByRole("form");

  expect(form).toHaveFormValues({ salesPerson: sales[0].id });
});

test("changing the amount updates the form correctly", () => {
  const { getByRole, getByLabelText } = render(
    <TradeForm instruments={instruments} salesPersons={[]} />
  );

  const form = getByRole("form");
  const amount = getByLabelText("Amount:");
  fireEvent.change(amount, { target: { value: 100 } });

  expect(form).toHaveFormValues({ amount: 100 });
});
