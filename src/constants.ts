import { CardinalDirection } from "./types"

export const clockwiseSeq = [
  CardinalDirection.North,
  CardinalDirection.East,
  CardinalDirection.South,
  CardinalDirection.West
]

export const antiClockwiseSeq = [
  CardinalDirection.North,
  CardinalDirection.West,
  CardinalDirection.South,
  CardinalDirection.East
]

export const missionXInputs = {
  plateauSize: '5 5',
  rovers: [
    {
      id: '001',
      coordinates: '1 2 N',
      instructions: 'LMLMLMLMM'
    },
    {
      id: '002',
      coordinates: '3 3 E',
      instructions: 'MMRMMRMRRM'
    }
  ]
}
