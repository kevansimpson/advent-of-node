/**
 * @module 2018_day11
 */
import { Point } from '../helpers/point'
/**
 * Puzzle input
 */
export const input: number = 6042

/**
 * <h2>Part 1</h2>
 * You watch the Elves and their sleigh fade into the distance as they head toward the North Pole.
 *
 * Actually, you're the one fading. The falling sensation returns.
 *
 * The low fuel warning light is illuminated on your wrist-mounted device. Tapping it once causes
 * it to project a hologram of the situation: a 300x300 grid of fuel cells and their current power
 * levels, some negative. You're not sure what negative power means in the context of time travel,
 * but it can't be good.
 *
 * Each fuel cell has a coordinate ranging from 1 to 300 in both the X (horizontal) and Y (vertical)
 * direction. In X,Y notation, the top-left cell is 1,1, and the top-right cell is 300,1.
 *
 * The interface lets you select any 3x3 square of fuel cells. To increase your chances of getting
 * to your destination, you decide to choose the 3x3 square with the largest total power.
 *
 * The power level in a given fuel cell can be found through the following process:
 * <pre>
 *     - Find the fuel cell's rack ID, which is its X coordinate plus 10.
 *     - Begin with a power level of the rack ID times the Y coordinate.
 *     - Increase the power level by the value of the grid serial number (your puzzle input).
 *     - Set the power level to itself multiplied by the rack ID.
 *     - Keep only the hundreds digit of the power level (so 12345 becomes 3; numbers with no hundreds digit become 0).
 *     - Subtract 5 from the power level.
 * </pre>
 *
 * For example, to find the power level of the fuel cell at 3,5 in a grid with serial number 8:
 * <pre>
 *     - The rack ID is 3 + 10 = 13.
 *     - The power level starts at 13 * 5 = 65.
 *     - Adding the serial number produces 65 + 8 = 73.
 *     - Multiplying by the rack ID produces 73 * 13 = 949.
 *     - The hundreds digit of 949 is 9.
 *     - Subtracting 5 produces 9 - 5 = 4.
 * </pre>
 *
 * So, the power level of this fuel cell is 4.
 *
 * Here are some more example power levels:
 * <pre>
 *     - Fuel cell at  122,79, grid serial number 57: power level -5.
 *     - Fuel cell at 217,196, grid serial number 39: power level  0.
 *     - Fuel cell at 101,153, grid serial number 71: power level  4.
 * </pre>
 *
 * Your goal is to find the 3x3 square which has the largest total power. The square must be entirely
 * within the 300x300 grid. Identify this square using the X,Y coordinate of its top-left fuel cell.
 * For example:
 *
 * For grid serial number 18, the largest total 3x3 square has a top-left corner of 33,45
 * (with a total power of 29); these fuel cells appear in the middle of this 5x5 region:
 * <pre>
 * -2  -4   4   4   4
 * -4   4   4   4  -5
 *  4   3   3   4  -4
 *  1   1   2   4  -3
 * -1   0   2  -5  -2
 * </pre>
 *
 * For grid serial number 42, the largest 3x3 square's top-left is 21,61
 * (with a total power of 30); they are in the middle of this region:
 * <pre>
 * -3   4   2   2   2
 * -4   4   3   3   4
 * -5   3   3   4  -4
 *  4   3   3   4  -3
 * 3    3   3  -5  -1
 * </pre>
 *
 * What is the X,Y coordinate of the top-left fuel cell of the 3x3 square with the largest total power?
 */
export const part1: [[Point, number, number], number] = [[[21, 61], input, 4], 30]

/**
 * <h2>Part 2</h2>
 * You discover a dial on the side of the device; it seems to let you select a square of any size,
 * not just 3x3. Sizes from 1x1 to 300x300 are supported.
 *
 * Realizing this, you now must find the square of any size with the largest total power. Identify
 * this square by including its size as a third parameter after the top-left coordinate:
 * a 9x9 square with a top-left corner of 3,5 is identified as 3,5,9.
 *
 * For example:
 * <pre>
 *     - For grid serial number 18, the largest total square (with a total power of 113) is 16x16 and
 *                                  has a top-left corner of 90,269, so its identifier is 90,269,16.
 *     - For grid serial number 42, the largest total square (with a total power of 119) is 12x12 and
 *                                  has a top-left corner of 232,251, so its identifier is 232,251,12.
 * </pre>
 *
 * What is the X,Y,size identifier of the square with the largest total power?
 */
export const part2: [[Point, number, number], number] = [[[232, 251], input, 2], 12]
