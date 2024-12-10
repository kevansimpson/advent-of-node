/**
 * @module 2024_day09
 */

export type Checksums = {
  checksum1: number,
  checksum2: number
}

type Block = {
  id: number,
  length: number
}

export function solve (input: string): Checksums {
  const disk1: number[] = []
  const disk2: Block[] = []
  let fileId = 0
  let freeSpace = false
  input.split('').forEach(ch => {
    const val = Number(ch)
    for (let i = 0; i < val; i++) {
      if (freeSpace)
        disk1.push(-1)
      else
        disk1.push(fileId)
    }
    if (freeSpace) {
      disk2.push({ id: -1, length: val })
      fileId++
    }
    else
      disk2.push({ id: fileId, length: val })
    freeSpace = !freeSpace
  })

  defragDisk(disk1)
  defragBlocks(disk2)

  return ({ checksum1: checksum(disk1), checksum2: checksumBlocks(disk2) })
}

function defragDisk(disk: number[]) {
  for (let i = disk.length - 1; i >= 0; i--) {
    const free = disk.indexOf(-1)
    if (free <= i && disk[i] >= 0) {
      disk[free] = disk[i]
      disk[i] = -1
    }
  }
}

function defragBlocks(disk: Block[]) {
  for (let i = disk.length - 1; i >= 0; i--) {
    const block = disk[i]
    if (block.id >= 0) {
      const empty = disk.find(b => b.id < 0 && b.length >= block.length)
      if (empty) {
        const index = disk.indexOf(empty)
        if (index <= i) {
          if (empty.length == block.length) {
            disk[index] = block
            disk[i] = empty
          }
          else {
            const remaining = empty.length - block.length
            disk[i] = { id: -1, length: block.length }
            disk[index] = { id: -1, length: remaining }
            disk.splice(index, 0, block)
          }
        }
      }
    }
  }
}

function checksum(disk: number[]): number {
  let checksum = 0
  for (let i = 0; i < disk.length; i++) {
    if (disk[i] > 0)
      checksum += (i * disk[i])
  }

  return checksum
}

function checksumBlocks(disk: Block[]): number {
  let checksum = 0
  let index = 0
  disk.forEach(block => {
    if (block.id > 0) {
      for (let i = 0; i < block.length; i++)
        checksum += (index++ * block.id)
    }
    else
      index += block.length
  })

  return checksum
}
