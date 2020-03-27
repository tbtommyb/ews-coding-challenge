import React, { FC, useState, ChangeEvent } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import Instrument from "../types/Instrument";

// TO NOTE: we can assume the onChange handler can always find the ID
// because the options values are determined by what's in the state
const TradeForm: FC = () => {
  const instruments = useSelector((state: RootState) => state.instruments);

  const [selectedInstrument, setInstrument] = useState<Instrument>(instruments[0]);

  const handleChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setInstrument(instruments.find((i: Instrument) => i.id === event.target.value)!);
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

