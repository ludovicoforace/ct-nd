import Plateau from "./Plateau";
import Rover from "./Rover";

const plateau = new Plateau(5, 5)
const rover = new Rover(plateau)
console.log(rover.execute('1 2 N', 'LMLMLMLMM'))
console.log(rover.execute('3 3 E', 'MMRMMRMRRM'))
