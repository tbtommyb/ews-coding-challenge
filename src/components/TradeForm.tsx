import React, { FC, useState } from "react";

import Select from "./Select";
import LevelComponent from "./Level";

import Instrument from "../types/Instrument";
import SalesPerson from "../types/SalesPerson";
import Level, { LevelType } from "../types/Level";

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

  return (
    <form role="form">
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
      <LevelComponent onLevelChange={setLevel} level={level} />
    </form>
  );
};

export default TradeForm;
