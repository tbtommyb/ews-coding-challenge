import React, { FC, useState, ChangeEvent } from "react";
import Instrument from "../types/Instrument";

// TO NOTE: we can assume the onChange handler can always find the ID
// because the options values are determined by what's in the state
interface TradeFormProps {
  instruments: Instrument[]
}

const TradeForm: FC<TradeFormProps> = ({ instruments }) => {
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>();

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedInstrument(instruments.find((i: Instrument) => i.id === event.target.value)!);
  }
  return (
    <>
      <form role="form">
        <label htmlFor="instrument"> Instrument</label>
        <select name="instrument" value={selectedInstrument?.id} onChange={handleChange}>{
          instruments.map((instrument) => {
            return <option value={instrument.id} key={instrument.id}>{instrument.name}</option>
          })
        }</select>
      </form>
    </>
  );
}

export default TradeForm;

