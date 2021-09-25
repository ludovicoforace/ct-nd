class Plateau {
  private x: number
  private y: number
  
  constructor(x = 0, y = 0) {
    const isValid = this.getIsValid(x, y)
    this.x = isValid ? x : 0
    this.y = isValid ? y : 0
  }

  private getIsValid(x: number, y: number) {
    return x > -1 && y > -1
  }

  get getXBoundary(): number {
    return this.x + 1
  }
  get getYBoundary(): number {
    return this.y + 1
  }
}

export default Plateau
