/**
 * @module 2024_day22
 */

export async function solve(input: number[]): Promise<[bigint, number]> {
  const bananaMap = new Map<number, number>()
  let part1 = BigInt(0)
  input.forEach(secret => {
    part1 += iterate(BigInt(secret), bananaMap)
  })
  
  return [part1, Math.max(...bananaMap.values())]
}

function iterate(secret: bigint, bananaMap: Map<number, number>): bigint {
  const nums: bigint[] = []
  const prices: number[] = []
  const deltas: number[] = []
  let price = Number(secret % P10)
  const allSequences = new Set<number>()

  for (let i = 0; i < 2000; i++) {
    secret = process(secret)
    nums.push(secret)
    const p = Number(secret % P10)
    prices.push(p)
    deltas.push(p - price)
    price = p

    if (i > 3) {
      const key = arrayKey(deltas.slice(i - 3, i + 1))
      if (!allSequences.has(key)) {
        allSequences.add(key)
        bananaMap.set(key, (bananaMap.get(key) ?? 0) + price)
      }
    }
  }

  return nums[1999]
}

function arrayKey(array: number[]): number {
  let key = (array[0] + 9) * 100000000
  key += (array[1] + 9) * 1000000
  key += (array[2] + 9) * 10000
  key += (array[3] + 9) * 100
  return key
}

const MOD = BigInt(16777216)
const P1 = BigInt(64)
const P2 = BigInt(32)
const P3 = BigInt(2048)
const P10 = BigInt(10)

function process(secret: bigint): bigint {
  const prune1 = (secret ^ secret * P1) % MOD
  const prune2 = (prune1 ^ (prune1 / P2)) % MOD
  return (prune2 ^ prune2 * P3) % MOD
}
