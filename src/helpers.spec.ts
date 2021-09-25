import { getIsCardinalDirection } from "./helpers"

describe('getIsCardinalDirection', () => {
  it('returns true if we pass a valid cardinal direction', () => {
    expect(getIsCardinalDirection('N')).toBe(true)
    expect(getIsCardinalDirection('S')).toBe(true)
    expect(getIsCardinalDirection('W')).toBe(true)
    expect(getIsCardinalDirection('E')).toBe(true)
  })

  it('returns false if we pass an invalid cardinal direction', () => {
    expect(getIsCardinalDirection('B')).toBe(false)
    expect(getIsCardinalDirection('A')).toBe(false)
    expect(getIsCardinalDirection('Z')).toBe(false)
    expect(getIsCardinalDirection('BLA')).toBe(false)
  })
})
