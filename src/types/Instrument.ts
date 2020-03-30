import Currency from "./Currency";

export default interface Instrument {
  id: string;
  name: string;
  currency: Currency;
  minTradeable: number;
}
