import { missionXInputs } from "./constants"
import Mission from "./Mission"
import { Messages } from "./types"

describe('Mission', () => {
  describe('the mission has not started', () => {
    const { plateauSize, rovers } = missionXInputs
    const mission = new Mission(plateauSize, rovers)

    it('displays the correct status message', () => {
      expect(mission.getStatus).toBe(Messages.NotDeployed)
    })

    it('reports nothing', () => {
      expect(mission.getReport).toBeNull()
    })
  })

  describe('starts a mission', () => {
    const { plateauSize, rovers } = missionXInputs
    const mission = new Mission(plateauSize, rovers)

    it('displays the correct status message', () => {
      mission.deploy()
      expect(mission.getStatus).toBe(Messages.Deploying)
    })

    it('reports nothing', () => {
      expect(mission.getReport).toBeNull()
    })
  })

  describe('deploy a misison', () => {
    const { plateauSize, rovers } = missionXInputs
    const mission = new Mission(plateauSize, rovers)

    it('displays the correct status message', async () => {
      await mission.deploy()
      expect(mission.getStatus).toBe(Messages.Deployed)
    })

    it('reports the deployed rovers', () => {
      const messages = mission.getReport!.split('\n')
      expect(messages[0]).toContain('1 3 N')
      expect(messages[1]).toContain('5 1 E')
    })
  })
})
