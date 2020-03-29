import React, { FC, useState } from 'react';
import Select from './Select';
import Instrument from '../types/Instrument';
import SalesPerson from '../types/SalesPerson';

interface TradeFormProps {
  instruments: Instrument[]
  salesPersons: SalesPerson[]
}

const TradeForm: FC<TradeFormProps> = ({ instruments, salesPersons }) => {
  const [selectedInstrument, setSelectedInstrument] = useState<Instrument>(instruments[0]);
  const [selectedSalesPerson, setSelectedSalesPerson] = useState<SalesPerson>(salesPersons[0]);

  return (
    <form role='form'>
      <label htmlFor='instrument'> Instrument</label>
      <Select name='instrument' options={instruments} selected={selectedInstrument} onChange={(instr) => setSelectedInstrument(instr as Instrument)}/>
      <label htmlFor='salesPerson'> Sales Person</label>
      <Select name='salesPerson' options={salesPersons} selected={selectedSalesPerson} onChange={(sp) => setSelectedSalesPerson(sp as SalesPerson)}/>
    </form>
  );
}

export default TradeForm;

