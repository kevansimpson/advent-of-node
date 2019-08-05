# Original function written by https://www.reddit.com/user/KoaLalica/
# posted @ https://www.reddit.com/r/adventofcode/comments/a5eztl/2018_day_12_solutions/
# modified to take generationsToWatch and (optionally) an alternate input file
def grow_plants(iterations, current_gen):
    neg_index, pos_index, tmp = 0, 0, ""

    for j in range(iterations):
        next_gen = ""
        current_gen = "....." + current_gen + "....."
        for i in range(2, len(current_gen) - 2):
            next_gen += d.get(current_gen[i - 2:i + 3], ".")

        tmp = next_gen[:3].lstrip('.') + next_gen[3:].rstrip('.')
        neg_index += min(next_gen.index('#') - 3, 0)
        if next_gen in current_gen:
            pos_index = (len(next_gen.rstrip('.')) - len(current_gen.rstrip('.')) + 2) * (iterations - j - 1)
            break
        current_gen = tmp

    return find_sum(neg_index, pos_index, tmp)

find_sum = lambda neg, pos, gen: sum(k + neg + pos for k in range(len(gen)) if gen[k] == '#')

import sys
filename = sys.argv[2] if (len(sys.argv) > 2) else "./test/resources/2018/input12.txt"
data = open(filename).read().strip().splitlines()
plants = data[0].strip("initial state: ")
d = {}

for r in range(2, len(data)):
    rule = data[r].split()
    d[rule[0]] = rule[2]

generations = int(sys.argv[1])
print(str(grow_plants(generations, plants)))
# print("Day 12 part 1: " + str(grow_plants(20, plants)))
# print("Day 12 part 2: " + str(grow_plants(50000000000, plants)))

