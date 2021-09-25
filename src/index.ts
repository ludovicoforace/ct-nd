import { missionXInputs } from "./constants";
import Mission from "./Mission";

async function startMission() {
  const { plateauSize, rovers } = missionXInputs
  const missionX = new Mission(plateauSize, rovers)
  await missionX.deploy()
  const report = missionX.getReport
  console.log(report)
}

startMission()
