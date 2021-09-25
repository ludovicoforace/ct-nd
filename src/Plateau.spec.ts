import Plateau from './Plateau'

describe('Plateau', () => {
  describe('We create a 5x5 plateau', () => {
    const grid = new Plateau(5, 5)

    it('should get the X axe boundary', () => {
      expect(grid.getXBoundary).toBe(6)
    })
    it('should get the Y axe boundary', () => {
      expect(grid.getYBoundary).toBe(6)
    })
  })

  describe('We create a 4x4 plateau', () => {
    const grid = new Plateau(4, 4)

    it('should get the X axe boundary', () => {
      expect(grid.getXBoundary).toBe(5)
    })
    it('should get the Y axe boundary', () => {
      expect(grid.getYBoundary).toBe(5)
    })
  })

  describe('We do not provide plateau with coordinates', () => {
    const grid = new Plateau()

    it('should get the X axe boundary', () => {
      expect(grid.getXBoundary).toBe(1)
    })
    it('should get the Y axe boundary', () => {
      expect(grid.getYBoundary).toBe(1)
    })
  })

  describe('We provide plateau with invalid coordinates', () => {
    const grid = new Plateau(-3, -4)

    it('should get the X axe boundary', () => {
      expect(grid.getXBoundary).toBe(1)
    })
    it('should get the Y axe boundary', () => {
      expect(grid.getYBoundary).toBe(1)
    })
  })
})
