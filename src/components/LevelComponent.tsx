import React, { FC, ChangeEvent } from "react";

import {
  FormControl,
  FormControlLabel,
  FormHelperText,
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
  errors: { value: string[], type: string[] };
}

const LevelComponent: FC<LevelComponentProps> = ({
  onLevelChange,
  level,
  isLoading,
  errors,
  currency = { code: "USD", sign: "$" },
  levelTypes = []
}) => {
  const handleTypeChange = (e: ChangeEvent<HTMLInputElement>) => {
    onLevelChange({ value: 0, type: e.target.value as LevelType });
  };

  const handleLevelChange = (e: ChangeEvent<HTMLInputElement>) => {
    onLevelChange({ ...level, value: +e.target.value });
  };

  const valueErrorsPresent = !!errors.value.length;
  const typeErrorsPresent = !!errors.type.length;
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
            error={valueErrorsPresent}
            helperText={errors.value.join(", ")}
          />
        </FormControl>
      </Grid>
      <Grid item xs={12}>
        <FormControl component="fieldset" error={typeErrorsPresent}>
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
          {typeErrorsPresent &&
           <FormHelperText>{errors.type.join(", ")}</FormHelperText>}
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default LevelComponent;
