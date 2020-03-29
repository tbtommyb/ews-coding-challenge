import Instrument from "./Instrument";
import SalesPerson from "./SalesPerson";
import Level from "./Level";

export default interface Trade {
  instrument: Instrument;
  salesPerson: SalesPerson;
  level: Level;
  amount: number;
}
