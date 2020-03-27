import React, { FC, useState, ChangeEvent } from 'react';
import Instrument from '../types/Instrument';
import SalesPerson from '../types/SalesPerson';

// TO NOTE: we can assume the onChange handler can always find the ID
// because the options values are determined by what's in the state
interface TradeFormProps {
  instruments: Instrument[]
  salesPersons: SalesPerson[]
}

const TradeForm: FC<TradeFormProps> = ({ instruments, salesPersons }) => {
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>(instruments[0]);
  const [selectedSalesPerson, setSelectedSalesPerson] = useState<SalesPerson>(salesPersons[0]);

  const handleInstrumentChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedInstrument(instruments.find((i: Instrument) => i.id === event.target.value)!);
  }

  const handleSalesChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedSalesPerson(salesPersons.find((sp: SalesPerson) => sp.id === event.target.value)!);
  }

  return (
    <>
      <form role='form'>
        <label htmlFor='instrument'> Instrument</label>
        <select name='instrument' value={selectedInstrument?.id} onChange={handleInstrumentChange}>{
          instruments.map((instrument) => {
            return <option value={instrument.id} key={instrument.id}>{instrument.name}</option>
          })
        }</select>
        <label htmlFor='salesPerson'> Sales Person</label>
        <select name='salesPerson' value={selectedSalesPerson?.id} onChange={handleSalesChange}>{
          salesPersons.map((sp) => {
            return <option value={sp.id} key={sp.id}>{sp.name}</option>
          })
        }</select>
      </form>
      <p>{selectedInstrument?.id}</p>
      <p>{selectedSalesPerson?.id}</p>
    </>
  );
}

export default TradeForm;

