class Plateau {
  private x: number
  private y: number
  private grid: string
  
  constructor(x = 0, y = 0) {
    const isValid = this.getIsValid(x, y)
    this.x = isValid ? x : 0
    this.y = isValid ? y : 0
    this.grid = ''
  }

  private getIsValid(x: number, y: number): boolean {
    return x > -1 && y > -1
  }

  get getXBoundary(): number {
    return this.x + 1
  }
  get getYBoundary(): number {
    return this.y + 1
  }

  set setGrid(pos: string) {
    this.grid += `${pos}-`
  }

  get getGrid() {
    return this.grid
  }
}

export default Plateau
