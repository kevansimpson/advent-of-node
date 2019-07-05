import assert from 'assert';
import 'mocha'
import path from 'path'
import { readLines, readNumbers } from '../src/helpers/input'
import { findDuplicateFrequency, sum } from '../src/2018/day01'
import { checksum, findPrototype } from '../src/2018/day02'

describe('2018 solutions', function() {
  this.slow(0)
  const testPath = path.join(__dirname, 'resources/2018') 

  describe('Day 1', function() {
    it('should return 518 and 72889, respectively', function(done) {
      readNumbers(path.join(testPath, 'input01.txt'), (input: number[]) => {
        assert.equal(sum(input), 518)
        assert.equal(findDuplicateFrequency(input), 72889)
        done()
      })
    })
  })

  describe('Day 2', function() {
    it('should return 3952 and vtnikorkulbfejvyznqgdxpaw, respectively', function(done) {
      readLines(path.join(testPath, 'input02.txt'), (input: string[]) => {
        assert.equal(checksum(input), 3952)
        assert.equal(findPrototype(input), 'vtnikorkulbfejvyznqgdxpaw')
        done()
      })
    })
  })
})
