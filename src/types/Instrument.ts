import Currency from "./Currency";
import { LevelType } from "./Level";

export default interface Instrument {
  id: string;
  name: string;
  currency: Currency;
  minTradeable: number;
  levelTypes: LevelType[];
}
