import assert from 'assert'
import 'mocha'
import { debug } from '../../src/helpers/util'
import { mapArea, shortestPath } from '../../src/2018/day20'

describe.only('2018 examples - Day 20', () => {
  it('shortest path', async () => {
    assert.strictEqual(shortestPath(mapArea('^WNE$').path), 3)
    assert.strictEqual(shortestPath(mapArea('^ENWWW(NEEE|SSE(EE|N))$').path), 10)
    assert.strictEqual(shortestPath(mapArea('^ENNWSWW(NEWS|)SSSEEN(WNSE|)EE(SWEN|)NNN$').path), 18)
    assert.strictEqual(shortestPath(mapArea('^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$').path), 23)
    assert.strictEqual(shortestPath(mapArea('^WSSEESWWWNW(S|NENNEEEENN(ESSSSW(NWSW|SSEN)|WSWWN(E|WWS(E|SS))))$').path), 31)
  })

  it.skip('map demo area', async () => {
    const input = '^ENWWW(NEEE|SSE(EE|N))$'
/*
#########
#.|.|.|.#
#-#######
#.|.|.|.#
#-#####-#
#.#.#X|.#
#-#-#####
#.|.|.|.#
#########`.split(/\r?\n/g)
*/
    const area = mapArea(input)
    // Furthest room requires passing 10 doors
    assert.strictEqual(shortestPath(area.path), 10)
    assert.strictEqual(area.size, 10)

    area.followPath()
    debug(area.display())

    // assert.strictEqual(newArea.size, 10)
    // assert.strictEqual(newArea.getResources(), 1147)
  })

  it.skip('magic lumber area', async () => {
    const input = '^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$' // `Regex: 
    /* Furthest room requires passing 23 doors

#############
#.|.|.|.|.|.#
#-#####-###-#
#.#.|.#.#.#.#
#-#-###-#-#-#
#.#.#.|.#.|.#
#-#-#-#####-#
#.#.#.#X|.#.#
#-#-#-###-#-#
#.|.#.|.#.#.#
###-#-###-#-#
#.|.#.|.|.#.#
#############`.split(/\r?\n/g)
*/
    const area = mapArea(input)
    debug(area.display())
    assert.strictEqual(area.size, 46)
    // const newArea = strangeMagic(area, 10)
    // debug(newArea.display())
    // assert.strictEqual(newArea.size, 10)
    // assert.strictEqual(newArea.getResources(), 1147)
  })

  it.skip('magic lumber area', async () => {
    // const input = '^ESSWWN(E|NNENN(EESS(WNSE|)SSS|WWWSSSSE(SW|NNNE)))$' // `Regex:
    /* Furthest room requires passing 23 doors

#############
#.|.|.|.|.|.#
#-#####-###-#
#.#.|.#.#.#.#
#-#-###-#-#-#
#.#.#.|.#.|.#
#-#-#-#####-#
#.#.#.#X|.#.#
#-#-#-###-#-#
#.|.#.|.#.#.#
###-#-###-#-#
#.|.#.|.|.#.#
#############`.split(/\r?\n/g)
*/
    // const area = mapLumberArea(input, 10)
    // debug(area.display())
    // const newArea = strangeMagic(area, 10)
    // debug(newArea.display())
    // assert.strictEqual(newArea.size, 10)
    // assert.strictEqual(newArea.getResources(), 1147)
  })

})
