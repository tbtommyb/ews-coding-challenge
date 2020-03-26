import Currency from "./Currency";

export default interface Instrument {
  id: string
  name: string
  currency: string // change to Currency
}
