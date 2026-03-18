import type { Pokemon, PokemonRole } from '../utils/poketypes'
const BASE_URL = 'https://pokeapi.co/api/v2'

type PokemonData = {
  name: string
  stats: { base_stat: number; stat: { name: string } }[]
  types: { type: { name: string } }[]
  role?: string
  weakTo?: string[]
  strongAgainst?: string[]
}

export async function fetchPokemon(name: string): Promise<Pokemon> {
  try {
    const response = await fetch(`${BASE_URL}/pokemon/${name.toLowerCase()}`)

    if (!response.ok) {
      throw new Error('Pokemon not found')
    }

    const data: PokemonData = await response.json()

    return parsePokemonData(data)
  } catch (error) {
    console.error('Failed to fetch Pokémon:', error)
    throw error
  }
}

async function fetchTypeRelations(types: string[]) {
  const results = await Promise.all(
    types.map(t => fetch(`https://pokeapi.co/api/v2/type/${t}`).then(res => res.json()))
  )

  const weakTo = new Set<string>()
  const strongAgainst = new Set<string>()

  for (const typeData of results) {
    typeData.damage_relations.double_damage_from.forEach((t: any) => weakTo.add(t.name))

    typeData.damage_relations.double_damage_to.forEach((t: any) => strongAgainst.add(t.name))
  }

  return {
    weakTo: Array.from(weakTo),
    strongAgainst: Array.from(strongAgainst)
  }
}

export async function fetchRecommendedTypes(weakToTypes: string[]): Promise<string[]> {
  const uniqueTypes = [...new Set(weakToTypes)]

  async function fetchTypeData(type: string) {
    const res = await fetch(`${BASE_URL}/type/${type.toLowerCase()}`)
    if (!res.ok) {
      throw new Error(`Failed to fetch type data for ${type}`)
    }
    return res.json()
  }

  const recommended = new Set<string>()

  const results = await Promise.all(uniqueTypes.map(fetchTypeData))

  for (const typeData of results) {
    const strongAgainst = typeData.damage_relations?.double_damage_to ?? []

    for (const entry of strongAgainst) {
      if (entry?.name) {
        recommended.add(entry.name)
      }
    }
  }

  return Array.from(recommended)
}

function determineRole(stats: Record<string, number>): PokemonRole {
  const attack = stats['attack'] || 0
  const defense = stats['defense'] || 0
  const spAttack = stats['special-attack'] || 0
  const spDefense = stats['special-defense'] || 0

  if (attack >= defense && attack >= spAttack && attack >= spDefense) {
    return 'attacker'
  } else if (defense >= attack && defense >= spAttack && defense >= spDefense) {
    return 'defender'
  } else if (spAttack >= attack && spAttack >= defense && spAttack >= spDefense) {
    return 'special-attacker'
  } else {
    return 'special-defender'
  }
}

async function parsePokemonData(data: PokemonData): Promise<Pokemon> {
  const stats = data.stats.reduce<Record<string, number>>((acc, s) => {
    acc[s.stat.name] = s.base_stat
    return acc
  }, {})

  const types: string[] = data.types.map(t => t.type.name)

  const role = determineRole(stats)

  // ✅ THIS IS THE MISSING PIECE
  const { weakTo, strongAgainst } = await fetchTypeRelations(types)

  return {
    name: data.name.toUpperCase(),
    types,
    role,
    weakTo,
    strongAgainst
  }
}
