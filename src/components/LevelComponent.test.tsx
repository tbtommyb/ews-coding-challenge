import React from "react";
import { render, fireEvent } from "@testing-library/react";

import LevelComponent from "./LevelComponent";
import { LevelType } from "../types/Level";

var level = { value: 0, type: LevelType.Price };
let levelTypes = Object.values(LevelType);

const renderLevelCommponent = (cb = () => {}) => {
  return render(<LevelComponent level={level} levelTypes={levelTypes} onLevelChange={cb} />);
}

test("renders the level types provided as options", () => {
  const { getByLabelText } = renderLevelCommponent();

  for (let lt in LevelType) {
    expect(getByLabelText(lt)).toBeTruthy();
  }
});

test("changes to the level value are dispatched", () => {
  const mockChange = jest.fn();
  const { getByLabelText } = renderLevelCommponent(mockChange);

  fireEvent.change(getByLabelText("Level ($)"), { target: { value: 1000 } });

  expect(mockChange).toHaveBeenCalledWith({ value: 1000, type: "Price" });
});

test("changes to the level type reset the value", () => {
  const mockChange = jest.fn();
  level = { value: 1000, type: LevelType.Price };
  const { getByLabelText } = renderLevelCommponent(mockChange);

  fireEvent.click(getByLabelText("Yield"));

  expect(mockChange).toHaveBeenCalledWith({ value: 0, type: "Yield" });
});
