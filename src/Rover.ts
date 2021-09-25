import Plateau from "./Plateau"
import { CardinalDirection, Rotation } from "./types"
import { getIsCardinalDirection } from "./helpers"
import { antiClockwiseSeq, clockwiseSeq } from "./constants"

class Rover {
  private x: number | null
  private y: number | null
  private heading: CardinalDirection | null
  private maxX: number
  private maxY: number

  constructor(plateau: Plateau) {
    this.x = null
    this.y = null
    this.heading = null
    this.maxX = plateau.getXBoundary
    this.maxY = plateau.getYBoundary
  }

  private getIsRotationInstruction(str: string): str is Rotation {
    return Object.values(Rotation).includes(<Rotation>str)
  }

  private getIsMoveInstruction(str: string): str is 'M' {
    return str === 'M'
  }

  private getIsValidPlacement(x: string, y: string, heading: string): boolean {
    const rotPattern = '(^)(N|S|W|E)($)'
    const xPattern = `^[0-${this.maxX - 1}]$`
    const yPattern = `^[0-${this.maxY - 1}]$`
    const pattern = new RegExp(`${rotPattern}|${xPattern}|${yPattern}`, 'i')

    return [x, y, heading].every(arg => pattern.test(arg))
  }

  private getRoverHeading(rotation: Rotation): CardinalDirection | null {
    if(!this.heading) return null
    const rotationSeq = rotation === Rotation.Left
      ? antiClockwiseSeq
      : clockwiseSeq
    const nextHeading = (rotationSeq.indexOf(this.heading) + 1) % rotationSeq.length
    return rotationSeq[nextHeading]
  }

  place(x: number, y: number, heading: string): void {
    const isValidPlacement = this.getIsValidPlacement(String(x), String(y), heading)
    if(!isValidPlacement || !getIsCardinalDirection(heading)) return
    this.x = x
    this.y = y
    this.heading = heading
  }

  move(): void {
    if(!this.heading || this.x == null || this.y == null) return

    switch(this.heading) {
      case CardinalDirection.North:
        if ((this.y + 1) < this.maxY) this.y = this.y + 1
        break
      case CardinalDirection.South:
        if((this.y - 1) > -1) this.y = this.y - 1
        break
      case CardinalDirection.West:
        if((this.x - 1) > -1) this.x = this.x - 1
        break
      case CardinalDirection.East:
        if((this.x + 1) < this.maxX) this.x = this.x + 1
        break
    }
  }

  rotate(instruction: Rotation): void {
    if(!this.heading || this.x == null || this.y == null || !this.getIsRotationInstruction(instruction)) return
    this.heading = this.getRoverHeading(instruction)
  }

  private executeInstructions(inst: string): void {
    const instructions = inst.split('')
    instructions.forEach(instruction => {
      if(this.getIsMoveInstruction(instruction)) this.move()
      if(this.getIsRotationInstruction(instruction)) this.rotate(instruction)
    })
  }

  execute(position: string, inst?: string): string | null {
    const [x, y, heading] = position.split(' ')
    this.place(Number(x), Number(y), heading)
    if(inst) this.executeInstructions(inst)
    if(this.x == null || this.y == null || !this.heading) return null
    return `${this.x} ${this.y} ${this.heading}`
  }

  get getX() {
    return this.x
  }

  get getY() {
    return this.y
  }

  get getHeading() {
    return this.heading
  }
}

export default Rover
