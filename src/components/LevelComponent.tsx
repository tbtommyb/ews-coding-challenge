import React, { FC, ChangeEvent } from "react";

import {
  FormControl,
  FormControlLabel,
  RadioGroup,
  Radio,
  TextField,
  Grid
} from "@material-ui/core";

import Level, { LevelType } from "../types/Level";
import Currency from "../types/Currency";

interface LevelComponentProps {
  level: Level;
  currency: Currency;
  levelTypes: LevelType[];
  onLevelChange: (level: Level) => any;
  isLoading: boolean;
}

const LevelComponent: FC<LevelComponentProps> = ({
  onLevelChange,
  level,
  isLoading,
  currency = { code: "USD", sign: "$" },
  levelTypes = []
}) => {
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    onLevelChange({ value: 0, type: e.target.value as LevelType });
  };

  const handleLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    onLevelChange({ ...level, value: +e.target.value });
  };

  return (
    <Grid container direction="row" justify="flex-start">
      <Grid item xs={12}>
        <FormControl>
          <TextField
            id="level"
            label={`Level (${currency.sign})`}
            type="number"
            inputProps={{ min: 0, step: 0.01 }}
            onChange={handleLevelChange}
            value={Number(level.value).toString()}
            disabled={isLoading}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset">
          <RadioGroup
            name="levelType"
            value={level.type}
            row={true}
            onChange={handleTypeChange}
          >
            {levelTypes.map((lt: string) => (
                <FormControlLabel value={lt} key={lt} control={<Radio disabled={isLoading} />} label={lt} />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default LevelComponent;
