import React, { FC, useState, ChangeEvent, FormEvent } from "react";
import { useDispatch } from "react-redux";

import Select from "./Select";
import LevelComponent from "./Level";

import Instrument from "../types/Instrument";
import SalesPerson from "../types/SalesPerson";
import Level, { LevelType } from "../types/Level";
import { createTrade } from "../store/actions";

interface TradeFormProps {
  instruments: Instrument[];
  salesPersons: SalesPerson[];
}

const TradeForm: FC<TradeFormProps> = ({ instruments, salesPersons }) => {
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
    dispatch(createTrade({
      instrument: selectedInstrument,
      salesPerson: selectedSalesPerson,
      level,
      amount
    }));
  };

  return (
    <form role="form" onSubmit={handleSubmit}>
      <label htmlFor="instrument"> Instrument</label>
      <Select
        name="instrument"
        options={instruments}
        selected={selectedInstrument}
        onChange={instr => setSelectedInstrument(instr as Instrument)}
      />
      <label htmlFor="salesPerson"> Sales Person</label>
      <Select
        name="salesPerson"
        options={salesPersons}
        selected={selectedSalesPerson}
        onChange={sp => setSelectedSalesPerson(sp as SalesPerson)}
      />
      <LevelComponent onLevelChange={setLevel} level={level} currency={selectedInstrument?.currency.sign} />
      <label htmlFor="amount">Amount:</label>
      <input
        id="amount"
        type="number"
        min={0}
        value={amount}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAmount(+e.target.value)
        }
      ></input>
      <input type="submit" value="Submit" />
    </form>
  );
};

export default TradeForm;
