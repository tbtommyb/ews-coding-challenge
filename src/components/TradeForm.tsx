import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";
import deepEqual from "deep-equal";
import cloneDeep from "clone-deep";

import {
  TextField,
  Button,
  FormControl,
  Grid,
  CircularProgress
} from "@material-ui/core";

import SelectComponent from "./SelectComponent";
import LevelComponent from "./LevelComponent";

import Instrument from "../types/Instrument";
import SalesPerson from "../types/SalesPerson";
import Level from "../types/Level";
import { createTradeRequest } from "../store/actions";

import "./TradeForm.css";

interface TradeFormProps {
  instruments: Instrument[];
  salesPersons: SalesPerson[];
  isLoading: boolean;
}

interface ValidationErrors {
  instrument: string[],
  salesPerson: string[],
  amount: string[],
  level: {
    value: string[],
    type: string[]
  }
}

const emptyValidationErrors: ValidationErrors = {
  instrument: [],
  salesPerson: [],
  amount: [],
  level: { value: [], type: [] }
};

const TradeForm: FC<TradeFormProps> = ({ instruments, salesPersons, isLoading }) => {
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    emptyValidationErrors
  );
  const [errorState, setErrorState] = useState<boolean>(true);

  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>(
    instruments[0]
  );

  const [selectedSalesPerson, setSelectedSalesPerson] = useState<SalesPerson>(
    salesPersons[0]
  );

  const [level, setLevel] = useState<Level>({
    value: 0,
    type: selectedInstrument?.levelTypes[0]
  });

  const [amount, setAmount] = useState<number>(0);

  const dispatch = useDispatch();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(createTradeRequest({
      instrument: selectedInstrument,
      salesPerson: selectedSalesPerson,
      level,
      amount,
      id: Date.now().toString()
    }));
  };

  const validate = () => {
    let errors = cloneDeep(emptyValidationErrors);

    if (!selectedInstrument) {
      errors.instrument.push("Instrument must be selected");
    } else {
      let si = selectedInstrument;
      if (amount < si.minTradeable) {
        errors.amount.push(`Minimum amount for ${si.name} is ${si.minTradeable}`);
      }
      if (!si.levelTypes.includes(level.type)) {
        errors.level.type.push(`Level type ${level.type} not valid for ${si.name}`);
      }
    }
    if (!selectedSalesPerson) {
      errors.salesPerson.push("Sales person must be selected");
    }
    if (level.value <= 0) {
      errors.level.value.push("Level must be above 0.0");
    }
    if (!level.type) {
      errors.level.type.push("Level type must be selected");
    }
    if (amount <= 0) {
      errors.amount.push("Amount must be above 0.0");
    }

    setValidationErrors(errors);
    setErrorState(!deepEqual(errors, emptyValidationErrors));
  }

  const handleInstrumentChange = (instrument: Instrument) => {
    setSelectedInstrument(instrument);
    if (!instrument.levelTypes.includes(level.type)) {
      setLevel({ value: 0, type: instrument.levelTypes[0]});
    }
  }

  return (
      <form role="form" className="TradeForm" onBlur={validate} onSubmit={handleSubmit}>
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
            errors={validationErrors.instrument}
            onChange={instr => handleInstrumentChange(instr as Instrument)}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={2}>
          <SelectComponent
            name="salesPerson"
            label="Sales Person"
            options={salesPersons}
            selected={selectedSalesPerson}
            errors={validationErrors.salesPerson}
            onChange={sp => setSelectedSalesPerson(sp as SalesPerson)}
            isLoading={isLoading}
          />
        </Grid>
        <Grid item xs={4}>
          <LevelComponent
            onLevelChange={setLevel}
            level={level}
            currency={selectedInstrument?.currency}
            levelTypes={selectedInstrument?.levelTypes}
            isLoading={isLoading}
            errors={validationErrors.level}
          />
        </Grid>
        <Grid item xs={3}>
          <FormControl>
            <TextField
              id="amount"
              label="Amount: "
              type="number"
              inputProps={{min: 0, step: 0.01}}
              error={!!validationErrors.amount.length}
              helperText={validationErrors.amount.join(", ")}
              value={Number(amount).toString()}
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
            disabled={isLoading || errorState}
            variant="contained"
            color="primary"
          >Submit</Button>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <div title="notifications" className="notifications">
          {isLoading && <div className="center"><CircularProgress/></div>}
        </div>
      </Grid>
    </form>
  );
};

export default TradeForm;
