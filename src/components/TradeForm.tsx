import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import "./TradeForm.css";
import Select from "./Select";
import LevelComponent from "./Level";

import Instrument from "../types/Instrument";
import SalesPerson from "../types/SalesPerson";
import Level, { LevelType } from "../types/Level";
import { createTradeRequest } from "../store/actions";

interface TradeFormProps {
  instruments: Instrument[];
  salesPersons: SalesPerson[];
  isLoading: boolean;
}

const TradeForm: FC<TradeFormProps> = ({ instruments, salesPersons, isLoading }) => {
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
    dispatch(createTradeRequest({
      instrument: selectedInstrument,
      salesPerson: selectedSalesPerson,
      level,
      amount,
      id: Date.now().toString()
    }));
  };

  return (
    <div className="TradeForm">
      <form role="form" onSubmit={handleSubmit}>
        <label htmlFor="instrument"> Instrument</label>
        <Select
          name="instrument"
          options={instruments}
          selected={selectedInstrument}
          onChange={instr => setSelectedInstrument(instr as Instrument)}
          isLoading={isLoading}
        />
        <label htmlFor="salesPerson"> Sales Person</label>
        <Select
          name="salesPerson"
          options={salesPersons}
          selected={selectedSalesPerson}
          onChange={sp => setSelectedSalesPerson(sp as SalesPerson)}
          isLoading={isLoading}
        />
      <LevelComponent
        onLevelChange={setLevel}
        level={level}
        currency={selectedInstrument?.currency.sign}
        isLoading={isLoading}
      />
        <label htmlFor="amount">Amount:</label>
        <input
          id="amount"
          type="number"
          min={0}
          value={amount}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAmount(+e.target.value)
          }
          disabled={isLoading}
        ></input>
        <input type="submit" value="Submit" disabled={isLoading} />
      </form>
    </div>
  );
};

export default TradeForm;
