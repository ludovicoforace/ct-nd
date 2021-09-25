import { CardinalDirection } from "./types"

export const getIsCardinalDirection = (str: string): str is CardinalDirection => (
  Object.values(CardinalDirection).includes(<CardinalDirection>str)
)

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
