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
export async function solve (input: string): Promise<number> {
  const disk: number[] = []
  let fileId = 0
  let freeSpace = false
  input.split('').forEach(ch => {
    const val = Number(ch)
    for (let i = 0; i < val; i++) {
      if (freeSpace)
        disk.push(-1)
      else
        disk.push(fileId)
    }
    if (freeSpace)
      fileId++
    freeSpace = !freeSpace
  })

  defragDisk(disk)

  return checksum(disk)
}

export async function solveBlocks (input: string): Promise<number> {
  const disk: Block[] = []
  let fileId = 0
  let freeSpace = false
  input.split('').forEach(ch => {
    const val = Number(ch)
    if (freeSpace) {
      disk.push({ id: -1, length: val })
      fileId++
    }
    else
      disk.push({ id: fileId, length: val })
    freeSpace = !freeSpace
  })

  defragBlocks(disk)

  return checksumBlocks(disk)
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
