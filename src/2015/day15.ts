/**
 * @module 2015_day15
 */
import { sum } from '../helpers/util'

export function highestScoringRecipe (input: string[], calories: number = -1): number {
  const baker = new Baker(input)
  const recipe = new Recipe()
  const ingredientList: Ingredient[] = Object.values(baker.ingredientMap)
  baker.buildAllRecipes(ingredientList, 0, recipe, 100, calories)

  return baker.highestScore
}

function buildIngredientMap (cookbook: string[]): Cookbook {
  const ingredientMap: Cookbook = {}
  for (const ingredient of cookbook) {
    const colon = ingredient.split(':')
    const name = colon[0]
    const matches = colon[1].match(/([-\d]+)/g)
    if (matches) {
      ingredientMap[name] = new Ingredient(name,
        +matches[0], +matches[1], +matches[2], +matches[3], +matches[4])
    } else throw new Error('No match: ' + ingredient)
  }

  return ingredientMap
}

class Baker {
  highestScore: number = Number.MIN_VALUE
  ingredientMap: Cookbook

  constructor (instr: string[]) {
    this.ingredientMap = buildIngredientMap(instr)
  }

  buildAllRecipes (ingredientList: Ingredient[], ingredientIndex: number,
    recipe: Recipe, total: number, calorieRequirement: number) {

    if (ingredientList.length <= ingredientIndex) { // recipe has all ingredients
      if (recipe.sumTeaspoons() === 100) {           // recipe has =100 teaspoons
        if (calorieRequirement <= 0 || recipe.caloricCount(this.ingredientMap) === calorieRequirement) {
          const score = recipe.calculateScore(this.ingredientMap)
          if (score > this.highestScore) {
            this.highestScore = score
          }
        }
      }

      return
    }

    for (let i = 0; i <= total; i++) {
      const current: Ingredient = ingredientList[ingredientIndex]
      recipe.setTeaspoons(current.name, i)
      this.buildAllRecipes(ingredientList, ingredientIndex + 1, recipe, total - i, calorieRequirement)
    }
  }
}

type Cookbook = { [key: string]: Ingredient }

class Ingredient {
  name: string
  traits: { [key: string]: number } = {}

  constructor (nm: string, cap: number, d: number, f: number, t: number, cal: number) {
    this.name = nm
    this.traits[Trait.capacity] = cap
    this.traits[Trait.durability] = d
    this.traits[Trait.flavor] = f
    this.traits[Trait.texture] = t
    this.traits[Trait.calories] = cal
  }

  getValue (trait: Trait): number {
    return this.traits[trait]
  }
}

class Recipe {
  ingredientMap: { [key: string]: number } = {} // # of tspn/ingredient

  caloricCount (cookbook: Cookbook): number {
    let count = 0
    for (const iname of Object.keys(cookbook)) {
      const ingredient = cookbook[iname]
      count += (this.ingredientMap[iname]) * ingredient.getValue(Trait.calories)
    }

    return (count <= 0) ? 0 : count
  }

  setTeaspoons (ingredient: string, teaspoons: number): void {
    this.ingredientMap[ingredient] = teaspoons
  }

  sumTeaspoons (): number {
    return sum(Object.values(this.ingredientMap))
  }

  calculateScore (cookbook: Cookbook): number {
    let score = 1
    for (const trait of Object.values(Trait)) {
      if (trait === Trait.calories) continue

      let value = 0
      for (const iname of Object.keys(cookbook)) {
        const ingredient = cookbook[iname]
        value += (this.ingredientMap[iname]) * ingredient.getValue(trait)
      }

      if (value <= 0) return 0

      score *= value
    }

    return score
  }
}

enum Trait {
  capacity = 'cap', durability = 'dur', flavor = 'flv', texture = 'txt', calories = 'cal'
}
