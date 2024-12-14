import assert from 'assert'
import 'mocha'
import { PointSet } from '../../src/helpers/set'

describe('PointSet unit tests', () => {
    it('add', async () => {
        const set = new PointSet()
        assert.strictEqual(set.size, 0)
        set.add([1, 1])
        assert.strictEqual(set.size, 1)
        set.add([1, 1])
        assert.strictEqual(set.size, 1)
        set.add([2, 2])
        assert.strictEqual(set.size, 2)
    })

    it('has', async () => {
        const set = new PointSet()
        assert.strictEqual(set.has([1, 1]), false)
        assert.strictEqual(set.has([2, 2]), false)
        set.add([1, 1])
        assert.strictEqual(set.has([1, 1]), true)
        assert.strictEqual(set.has([2, 2]), false)
        set.add([2, 2])
        assert.strictEqual(set.has([1, 1]), true)
        assert.strictEqual(set.has([2, 2]), true)
    })

    it('values', async () => {
        const set = new PointSet()
        set.add([1, 1])
        set.add([2, 2])
        assert.deepStrictEqual(set.values(), [[1, 1], [2, 2]])
        set.add([3, 3])
        assert.deepStrictEqual(set.values(), [[1, 1], [2, 2], [3, 3]])
    })

    it('delete', async () => {
        const set = new PointSet()
        set.add([1, 1])
        set.add([2, 2])
        set.add([3, 3])
        assert.deepStrictEqual(set.values(), [[1, 1], [2, 2], [3, 3]])
        set.delete([2, 2])
        assert.deepStrictEqual(set.values(), [[1, 1], [3, 3]])
        set.delete([2, 2])
        assert.deepStrictEqual(set.values(), [[1, 1], [3, 3]])
    })

    it('clear', async () => {
        const set = new PointSet()
        set.add([1, 1])
        set.add([2, 2])
        set.add([3, 3])
        assert.deepStrictEqual(set.values(), [[1, 1], [2, 2], [3, 3]])
        assert.strictEqual(set.size, 3)
        set.clear()
        assert.deepStrictEqual(set.values(), [])
        assert.strictEqual(set.size, 0)
        set.clear()
        assert.deepStrictEqual(set.values(), [])
        assert.strictEqual(set.size, 0)
    })

    it('forEach', async () => {
        const set = new PointSet()
        set.add([1, 1])
        set.add([2, 2])
        set.add([3, 3])
        assert.deepStrictEqual(set.values(), [[1, 1], [2, 2], [3, 3]])
        let x = 0
        let y = 0
        set.forEach(item => {
            x += item[0]
            y -= item[1]
        })
        assert.strictEqual(x, 6)
        assert.strictEqual(y, -6)
    })
})
  