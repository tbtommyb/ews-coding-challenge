import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import {
  TextField,
  Button,
  FormControl,
  Grid
} from "@material-ui/core";

import SelectComponent from "./SelectComponent";
import LevelComponent from "./LevelComponent";

import Instrument from "../types/Instrument";
import SalesPerson from "../types/SalesPerson";
import Level, { LevelType } from "../types/Level";
import { createTradeRequest } from "../store/actions";

import "./TradeForm.css";

interface TradeFormProps {
  instruments: Instrument[];
  salesPersons: SalesPerson[];
  isLoading: boolean;
}

const TradeForm: FC<TradeFormProps> = ({ instruments, salesPersons, isLoading }) => {
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>(
    instruments[0]
  );
  const [selectedSalesPerson, setSelectedSalesPerson] = useState<SalesPerson>(
    salesPersons[0]
  );
  const [level, setLevel] = useState<Level>({
    value: 0,
    type: LevelType.Price
  });
  const [amount, setAmount] = useState<number>(0);

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const [isValid, errors] = validate();
    setValidationErrors(errors);
    if (!isValid) {
      return;
    }

    dispatch(createTradeRequest({
      instrument: selectedInstrument,
      salesPerson: selectedSalesPerson,
      level,
      amount,
      id: Date.now().toString()
    }));
  };

  const validate = (): [boolean, string[]] => {
    let errors = [];
    if (!selectedInstrument) {
      errors.push("Instrument must be selected");
    }
    if (amount < selectedInstrument?.minTradeable) {
      let si = selectedInstrument;
      errors.push(`Minimum amount for ${si.name} is ${si.currency.sign}${si.minTradeable}`);
    }
    if (!selectedSalesPerson) {
      errors.push("Sales person must be selected");
    }
    if (level.value === 0) {
      errors.push("Level must be above 0.0");
    }
    if (!level.type) {
      errors.push("Level type must be selected");
    }
    if (amount === 0) {
      errors.push("Amount must be above 0.0");
    }
    return [errors.length === 0, errors];
  }

  const errorsPresent = validationErrors.length > 0;
  return (
    <form role="form" className="TradeForm" onSubmit={handleSubmit}>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="flex-start"
      >
        <Grid item xs={2}>
          <SelectComponent
            name="instrument"
            label="Instrument"
            options={instruments}
            selected={selectedInstrument}
            onChange={instr => setSelectedInstrument(instr as Instrument)}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectComponent
            name="salesPerson"
            label="Sales Person"
            options={salesPersons}
            selected={selectedSalesPerson}
            onChange={sp => setSelectedSalesPerson(sp as SalesPerson)}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={4}>
          <LevelComponent
            onLevelChange={setLevel}
            level={level}
            currency={selectedInstrument?.currency.sign}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <TextField
              id="amount"
              label="Amount: "
              type="number"
              inputProps={{min: 0, step: 0.01}}
              value={amount}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setAmount(+e.target.value)
              }
              disabled={isLoading}
            />
          </FormControl>
        </Grid>
        <Grid item xs={1}>
          <Button
            type="submit"
            disabled={isLoading}
            variant="contained"
            color="primary"
          >Submit</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div title="notifications" className="notifications">
          {errorsPresent && <p>{validationErrors.join(". ")}</p>}
        </div>
      </Grid>
    </form>
  );
};

export default TradeForm;
