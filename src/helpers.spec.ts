import { getIsCardinalDirection, sleep } from "./helpers"

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

describe('sleep', () => {
  it('should wait for ms before resolving', async () => {
    jest.useFakeTimers()
    const mockFn = jest.fn()
    sleep(100).then(mockFn)

    jest.advanceTimersByTime(50)
    await Promise.resolve()
    expect(mockFn).not.toHaveBeenCalled()

    jest.advanceTimersByTime(50)
    await Promise.resolve()
    expect(mockFn).toHaveBeenCalled()
  })
})
