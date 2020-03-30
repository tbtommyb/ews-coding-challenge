import React, { FC, ChangeEvent } from "react";

import {
  FormControl,
  FormControlLabel,
  FormGroup,
  RadioGroup,
  Radio,
  TextField
} from "@material-ui/core";

import Level, { LevelType } from "../types/Level";

interface LevelComponentProps {
  level: Level;
  currency: string;
  onLevelChange: (level: Level) => any;
  isLoading: boolean;
}

const LevelComponent: FC<LevelComponentProps> = ({
  onLevelChange,
  level,
  isLoading,
  currency = "$"
}) => {
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    onLevelChange({ value: 0, type: e.target.value as LevelType });
  };

  const handleLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    onLevelChange({ ...level, value: +e.target.value });
  };

  return (
      <FormGroup row={true}>
      <FormControl>
        <TextField
          id="level"
          label={`Level (${currency})`}
          type="number"
    inputProps={{ min: 0, step: 0.01 }}
          onChange={handleLevelChange}
          value={level.value}
          disabled={isLoading}
        />
      </FormControl>
      <FormControl component="fieldset">
        <RadioGroup
          name="levelType"
          value={level.type}
    row={true}
          onChange={handleTypeChange}
        >
          {Object.keys(LevelType).map((lt: string) => (
              <FormControlLabel value={lt} key={lt} control={<Radio disabled={isLoading} />} label={lt} />
          ))}
        </RadioGroup>
      </FormControl>
    </FormGroup>
  );
};

export default LevelComponent;
