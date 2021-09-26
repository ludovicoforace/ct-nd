import Plateau from './Plateau'
import Rover from './Rover'
import { Rotation } from './types'

describe('Rover', () => {
  describe('we send the rover correct inputs', () => {
    it('moves, rotate the rover and outputs the updated positions', () => {
      const plateau = new Plateau(5, 5)
      const rover = new Rover(plateau)

      expect(rover.execute('1 2 N', 'LMLMLMLMM')).toBe('1 3 N')
      expect(rover.execute('3 3 E', 'MMRMMRMRRM')).toBe('5 1 E')
    })
  })

  describe('the position input is incorrect', () => {
    it('returns null', () => {
      const plateau = new Plateau(3, 3)
      const rover = new Rover(plateau)

      expect(rover.execute('4 4 N', 'LMRMLMRMM')).toBe(null)
      expect(rover.execute('-1 -1 S', 'LLMR')).toBe(null)
    })
  })

  describe('ignores the moves which go beyong the plateau boundaries', () => {
    const plateau = new Plateau(5, 5)
    const rover = new Rover(plateau)

    it('moves the rover but ignores incorrect moving instrucitons', () => {
      // the last 2 MM instrucitons will be ignored
      expect(rover.execute('1 0 N', 'MMLMMM')).toBe('0 2 W')
    })

    it('will not move the rover as all the moving instruction are incorrect', () => {
      expect(rover.execute('0 0 S', 'MMMM')).toBe('0 0 S')
    })
  })

  describe('ignores the moves toward collision', () => {
    it('moves, rotate the rover up to a certain point', () => {
      const plateau = new Plateau(5, 5)
      plateau.setGrid = '51'
      const rover = new Rover(plateau)

      expect(rover.execute('1 2 N', 'LMLMLMLMM')).toBe('1 3 N')
      // only 4 instructions will be followed MMRM
      // before stopping for collision
      expect(rover.execute('3 3 E', 'MMRMMRMRRM')).toBe('5 2 E')
    })
  })

  describe('we do not provide instructions', () => {
    it('only places the rover', () => {
      const plateau = new Plateau(5, 5)
      const rover = new Rover(plateau)

      expect(rover.execute('0 0 E',)).toBe('0 0 E')
    })
  })

  describe('place()', () => {
    describe('we provide valid coordinates', () => {
      it('places the rover at the given coordinates and heading', () => {
        const plateau = new Plateau(4, 4)
        const rover = new Rover(plateau)

        rover.place(2, 4, 'E')
        expect(rover.getX).toBe(2)
        expect(rover.getY).toBe(4)
        expect(rover.getHeading).toBe('E')
      })
    })

    describe('we have a collision', () => {
      it('does not place the rover', () => {
        const plateau = new Plateau(4, 4)
        plateau.setGrid = '24'
        const rover = new Rover(plateau)

        rover.place(2, 4, 'E')
        expect(rover.getX).toBe(null)
        expect(rover.getY).toBe(null)
        expect(rover.getHeading).toBe(null)
      })
    })

    describe('we provide invalid inputs', () => {
      it('does not place the rover when the coordinates are invalid', () => {
        const plateau = new Plateau(2, 2)
        const rover = new Rover(plateau)

        rover.place(3, 3, 'W')
        expect(rover.getX).toBe(null)
        expect(rover.getY).toBe(null)
        expect(rover.getHeading).toBe(null)
      })

      it('does not place the rover when an invalid cardinal direction is provided', () => {
        const plateau = new Plateau(5, 5)
        const rover = new Rover(plateau)

        // Z is not a cardinal direction
        rover.place(3, 3, 'Z')
        expect(rover.getX).toBe(null)
        expect(rover.getY).toBe(null)
        expect(rover.getHeading).toBe(null)
      })
    })
  })

  describe('move()', () => {
    it('does not move the rover when it is not placed', () => {
      const plateau = new Plateau(5, 5)
      const rover = new Rover(plateau)
      rover.move()

      expect(rover.getX).toBe(null)
      expect(rover.getY).toBe(null)
      expect(rover.getHeading).toBe(null)
    })

    describe('northward', () => {
      it('moves the rover', () => {
        const plateau = new Plateau(4, 4)
        const rover = new Rover(plateau)
        rover.place(4, 0, 'N')
        rover.move()

        expect(rover.getX).toBe(4)
        expect(rover.getY).toBe(1)
        expect(rover.getHeading).toBe('N')
      })

      it('does not move the rover beyond its boundary', () => {
        const plateau = new Plateau(4, 4)
        const rover = new Rover(plateau)
        rover.place(4, 4, 'N')
        rover.move()

        expect(rover.getX).toBe(4)
        expect(rover.getY).toBe(4)
        expect(rover.getHeading).toBe('N')
      })

      it('does not move the rover when there is a collision', () => {
        const plateau = new Plateau(4, 4)
        plateau.setGrid = '41'
        const rover = new Rover(plateau)
        rover.place(4, 0, 'N')
        rover.move()

        expect(rover.getX).toBe(4)
        expect(rover.getY).toBe(0)
        expect(rover.getHeading).toBe('N')
      })
    })

    describe('southward', () => {
      it('moves the rover southward', () => {
        const plateau = new Plateau(5, 5)
        const rover = new Rover(plateau)
        rover.place(1, 2, 'S')
        rover.move()
        rover.move()

        expect(rover.getX).toBe(1)
        expect(rover.getY).toBe(0)
        expect(rover.getHeading).toBe('S')
      })

      it('does not move the rover beyond its boundary', () => {
        const plateau = new Plateau(5, 5)
        const rover = new Rover(plateau)
        rover.place(1, 0, 'S')
        rover.move()

        expect(rover.getX).toBe(1)
        expect(rover.getY).toBe(0)
        expect(rover.getHeading).toBe('S')
      })

      it('does not move the rover when there is a collision', () => {
        const plateau = new Plateau(5, 5)
        plateau.setGrid = '22'
        const rover = new Rover(plateau)
        rover.place(2, 3, 'S')
        rover.move()

        expect(rover.getX).toBe(2)
        expect(rover.getY).toBe(3)
        expect(rover.getHeading).toBe('S')
      })
    })

    describe('westward', () => {
      it('moves the rover westward', () => {
        const plateau = new Plateau(5, 5)
        const rover = new Rover(plateau)
        rover.place(1, 0, 'W')
        rover.move()

        expect(rover.getX).toBe(0)
        expect(rover.getY).toBe(0)
        expect(rover.getHeading).toBe('W')
      })

      it('does not move the rover beyond its boundary', () => {
        const plateau = new Plateau(5, 5)
        const rover = new Rover(plateau)
        rover.place(0, 0, 'W')
        rover.move()

        expect(rover.getX).toBe(0)
        expect(rover.getY).toBe(0)
        expect(rover.getHeading).toBe('W')
      })

      it('does not move the rover when there is a collision', () => {
        const plateau = new Plateau(5, 5)
        plateau.setGrid = '22-14-33'
        const rover = new Rover(plateau)
        rover.place(2, 4, 'W')
        rover.move()

        expect(rover.getX).toBe(2)
        expect(rover.getY).toBe(4)
        expect(rover.getHeading).toBe('W')
      })
    })

    describe('eastward', () => {
      it('moves the rover eastward', () => {
        const plateau = new Plateau(2, 2)
        const rover = new Rover(plateau)
        rover.place(0, 2, 'E')
        rover.move()
        rover.move()

        expect(rover.getX).toBe(2)
        expect(rover.getY).toBe(2)
        expect(rover.getHeading).toBe('E')
      })

      it('does not move the rover beyond its boundary', () => {
        const plateau = new Plateau(2, 2)
        const rover = new Rover(plateau)
        rover.place(2, 2, 'E')
        rover.move()
        rover.move()

        expect(rover.getX).toBe(2)
        expect(rover.getY).toBe(2)
        expect(rover.getHeading).toBe('E')
      })

      it('does not move the rover when there is a collision', () => {
        const plateau = new Plateau(2, 2)
        plateau.setGrid = '22-14-12'
        const rover = new Rover(plateau)
        rover.place(0, 2, 'E')
        rover.move()
        rover.move()

        expect(rover.getX).toBe(0)
        expect(rover.getY).toBe(2)
        expect(rover.getHeading).toBe('E')
      })
    })
  })

  describe('rotate()', () => {
    it('rotates the rover left', () => {
      const plateau = new Plateau(5, 5)
      const rover = new Rover(plateau)
      rover.place(1, 0, 'N')
      rover.rotate(Rotation.Left)

      expect(rover.getHeading).toBe('W')
    })

    it('rotates the rover right', () => {
      const plateau = new Plateau(5, 5)
      const rover = new Rover(plateau)
      rover.place(2, 4, 'S')
      rover.rotate(Rotation.Right)
      rover.rotate(Rotation.Right)

      expect(rover.getHeading).toBe('N')
    })

    it('rotates the rover left and comes back to the original position', () => {
      const plateau = new Plateau(1, 1)
      const rover = new Rover(plateau)
      rover.place(1, 1, 'E')
      rover.rotate(Rotation.Left)
      rover.rotate(Rotation.Left)
      rover.rotate(Rotation.Left)
      rover.rotate(Rotation.Left)

      expect(rover.getHeading).toBe('E')
    })
  })
})
