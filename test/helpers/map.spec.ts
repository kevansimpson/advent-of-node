import assert from 'assert'
import 'mocha'
import { PointMap } from '../../src/helpers/map'

describe('PointMap unit tests', () => {
    it('set', async () => {
        const map = new PointMap<number>()
        assert.strictEqual(map.size, 0)
        map.set([1, 1], 1)
        assert.strictEqual(map.size, 1)
        map.set([1, 1], 2)
        assert.strictEqual(map.size, 1)
        map.set([2, 2], 3)
        assert.strictEqual(map.size, 2)
    })

    it('has', async () => {
        const map = new PointMap<number>()
        assert.strictEqual(map.has([1, 1]), false)
        assert.strictEqual(map.has([2, 2]), false)
        map.set([1, 1], 1)
        assert.strictEqual(map.has([1, 1]), true)
        assert.strictEqual(map.has([2, 2]), false)
        map.set([2, 2], 2)
        assert.strictEqual(map.has([1, 1]), true)
        assert.strictEqual(map.has([2, 2]), true)
    })

    it('get', async () => {
        const map = new PointMap<number>()
        assert.ok(map.get([1, 1]) === undefined)
        assert.ok(map.get([2, 2]) === undefined)
        assert.ok(map.get([3, 3]) === undefined)
        assert.strictEqual(map.size, 0)
        map.set([1, 1], 1)
        assert.strictEqual(map.get([1, 1]), 1)
        map.set([1, 1], 2)
        assert.strictEqual(map.get([1, 1]), 2)
        map.set([2, 2], 3)
        assert.strictEqual(map.get([1, 1]), 2)
        assert.strictEqual(map.get([2, 2]), 3)
    })

    it('entries', async () => {
        const map = new PointMap<number>()
        assert.deepStrictEqual(map.entries(), [])
        map.set([1, 1], 1)
        map.set([2, 2], 2)
        assert.deepStrictEqual(map.entries(), [[[1, 1], 1], [[2, 2], 2]])
        map.set([3, 3], 3)
        assert.deepStrictEqual(map.entries(), [[[1, 1], 1], [[2, 2], 2], [[3, 3], 3]])
    })

    it('keys', async () => {
        const map = new PointMap<number>()
        assert.deepStrictEqual(map.keys(), [])
        map.set([1, 1], 1)
        map.set([2, 2], 2)
        assert.deepStrictEqual(map.keys(), [[1, 1], [2, 2]])
        map.set([3, 3], 3)
        assert.deepStrictEqual(map.keys(), [[1, 1], [2, 2], [3, 3]])
    })

    it('values', async () => {
        const map = new PointMap<number>()
        map.set([1, 1], 1)
        map.set([2, 2], 2)
        assert.deepStrictEqual(map.values(), [1, 2])
        map.set([3, 3], 3)
        assert.deepStrictEqual(map.values(), [1, 2, 3])
    })

    it('delete', async () => {
        const map = new PointMap<number>()
        assert.deepStrictEqual(map.keys(), [])
        map.delete([2, 2])
        assert.deepStrictEqual(map.keys(), [])

        map.set([1, 1], 1)
        map.set([2, 2], 2)
        map.set([3, 3], 3)
        assert.deepStrictEqual(map.keys(), [[1, 1], [2, 2], [3, 3]])
        assert.deepStrictEqual(map.values(), [1, 2, 3])
        map.delete([2, 2])
        assert.deepStrictEqual(map.keys(), [[1, 1], [3, 3]])
        assert.deepStrictEqual(map.values(), [1, 3])
        map.delete([2, 2])
        assert.deepStrictEqual(map.keys(), [[1, 1], [3, 3]])
        assert.deepStrictEqual(map.values(), [1, 3])
    })

    it('clear', async () => {
        const map = new PointMap<number>()
        map.set([1, 1], 1)
        map.set([2, 2], 2)
        map.set([3, 3], 3)
        assert.deepStrictEqual(map.keys(), [[1, 1], [2, 2], [3, 3]])
        assert.strictEqual(map.size, 3)
        map.clear()
        assert.deepStrictEqual(map.keys(), [])
        assert.strictEqual(map.size, 0)
        map.clear()
        assert.deepStrictEqual(map.keys(), [])
        assert.strictEqual(map.size, 0)
    })

    it('forEach', async () => {
        const map = new PointMap<number>()
        map.set([1, 1], 1)
        map.set([2, 2], 2)
        map.set([3, 3], 3)
        assert.deepStrictEqual(map.keys(), [[1, 1], [2, 2], [3, 3]])
        assert.deepStrictEqual(map.values(), [1, 2, 3])
        let x = 0
        let y = 0
        let z = 2
        map.forEach((value, key) => {
            x += key[0]
            y -= key[1]
            z *= value
        })
        assert.strictEqual(x, 6)
        assert.strictEqual(y, -6)
        assert.strictEqual(z, 12)
    })

    it('toString', async () => {
        const map = new PointMap<number>()
        map.set([1, 1], 1)
        map.set([2, 2], 2)
        map.set([3, 3], 3)
        assert.strictEqual(map.toString(), '[[[1,1],1],[[2,2],2],[[3,3],3]]')
    })
})
  