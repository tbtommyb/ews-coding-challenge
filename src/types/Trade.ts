import Instrument from './Instrument';
import SalesPerson from './SalesPerson';

export default interface Trade {
  instrument: Instrument
  salesPerson: SalesPerson
}
