import React from "react";
import { render, within } from "@testing-library/react";
import userEvent from '@testing-library/user-event';

import SelectComponent from "./SelectComponent";

const TEST_OPTIONS = [
  { id: "1", name: "test_1" },
  { id: "2", name: "test_2" },
  { id: "3", name: "test_3" }
];

const renderSelect = (options = [], cb = () => {}) => {
  let selected = options[0];
  return render(
    <SelectComponent
      name="test"
      label="Test"
      options={options}
      selected={selected}
      onChange={cb}
      isLoading={false}
      errors={[]}
    />
  );
};

test("renders no options", () => {
  const { queryAllByRole } = renderSelect();
  const options = queryAllByRole("option");

  expect(options).toHaveLength(0);
});

test("renders every option provided as a prop", async () => {
  const { getByLabelText } = renderSelect(TEST_OPTIONS);

  userEvent.click(getByLabelText("Test"));
  const listbox = await within(document.body).findByRole("listbox");

  expect(within(listbox).getAllByRole("option")).toHaveLength(TEST_OPTIONS.length);
});

test("updates the selected instrument on change", async () => {
  const mockSetSelected = jest.fn();
  const { getByLabelText } = renderSelect(TEST_OPTIONS, mockSetSelected);

  userEvent.click(getByLabelText("Test"));
  const listbox = await within(document.body).findByRole("listbox");
  const listItem = await within(listbox).findByText(TEST_OPTIONS[1].name);

  userEvent.click(listItem);

  expect(mockSetSelected).toHaveBeenCalledWith(TEST_OPTIONS[1]);
});
