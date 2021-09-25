import { sleep } from "./helpers"
import Plateau from "./Plateau"
import Rover from "./Rover"
import { Messages, MissionStatus } from "./types"

interface RoverInput {
  id: string
  coordinates: string
  instructions: string
}

class Mission {
  private status: MissionStatus
  private messages: string[]
  private plateauSize: string
  private rovers: RoverInput[]

  constructor(plateau: string, rovers: RoverInput[]) {
    this.status = MissionStatus.NotDeployed
    this.messages = []
    this.plateauSize = plateau
    this.rovers = rovers
  }

  async deploy(): Promise<void> {
    this.status = MissionStatus.Deploying
    const [x, y] = this.plateauSize.split(' ')
    await sleep(3000)
    const plateau = new Plateau(Number(x), Number(y))
    this.rovers.forEach(({ id, coordinates, instructions }) => {
      const rover = new Rover(plateau)
      const placement = rover.execute(coordinates, instructions)
      this.messages.push(`Rover ${id} has been deployed at ${placement}`)
    })
    this.status = MissionStatus.Deployed
  }

  get getStatus(): Messages {
    switch(this.status) {
      case MissionStatus.Deployed:
        return Messages.Deployed
      case MissionStatus.Deploying:
        return Messages.Deploying
      default:
        return Messages.NotDeployed
    }
  }

  get getReport(): string | null {
    if(this.status !== MissionStatus.Deployed || !this.messages.length) return null
    return this.messages.join('\n')
  }
}

export default Mission
