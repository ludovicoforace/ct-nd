import { missionXInputs } from "./constants";
import Mission from "./Mission";

async function startMission() {
  const { plateauSize, rovers } = missionXInputs
  const missionX = new Mission(plateauSize, rovers)
  console.log(missionX.getReport)
  await missionX.deploy()
  console.log(missionX.getStatus)
  console.log(missionX.getReport)
}

startMission()
