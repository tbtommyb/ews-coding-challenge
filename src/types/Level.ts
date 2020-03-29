export enum LevelType {
  Price = "Price",
  Yield = "Yield",
  Spread = "Spread"
}

export default interface Level {
  value: number
  type: LevelType
}
