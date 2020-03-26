import React, { FC, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/reducers";
import Instrument from "../types/Instrument";

// TO NOTE: we can assume the onChange handler can always find the ID
// because the options values are determined by what's in the state
const TradeForm: FC = () => {
  const instruments = useSelector((state: RootState) => state.instruments);

  const [selectedInstrument, setInstrument] = useState<Instrument>(instruments[0]);

  const handleInstrumentSelect = (event: any) => {
    setInstrument(instruments.find((i: Instrument) => i.id === event.target.value)!);
  }
  return (
    <>
      <form>
        <label htmlFor="instrument"> Instrument</label>
        <select name="instrument" value={selectedInstrument?.id} onChange={handleInstrumentSelect}>{
          instruments.map((instrument) => {
            return <option value={instrument.id} key={instrument.id}>{instrument.name}</option>
          })
        }</select>
      </form>
      <p>{selectedInstrument?.name}</p>
    </>
  );
}

export default TradeForm;

