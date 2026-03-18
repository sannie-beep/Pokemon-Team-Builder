export const TYPE_COLORS: Record<string, string> = {
  fairy: '#d4a0e0',
  fire: '#f08030',
  water: '#6890f0',
  grass: '#78c850',
  electric: '#f8d030',
  ice: '#98d8d8',
  fighting: '#c03028',
  poison: '#a040a0',
  ground: '#e0c068',
  flying: '#a890f0',
  psychic: '#f85888',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
  dragon: '#7038f8',
  dark: '#705848',
  steel: '#b8b8d0',
  normal: '#a8a878'
}

type PokemonRole = 'attacker' | 'defender' | 'special-attacker' | 'special-defender'

type PokeTeamMainRole = 'Attacker' | 'Defender' | 'Balanced'

type Pokemon = {
  name: string
  types: string[]
  role: PokemonRole
  weakTo: string[]
  strongAgainst: string[]
}

type PokemonTeam = {
  pokemonList: Pokemon[]
  length: number
  totalAttackers: number
  totalDefenders: number
  totalPhysicalAttackers: number
  totalSpecialAttackers: number
  totalPhysicalDefenders: number
  totalSpecialDefenders: number
  allTeamTypes: string[]
  allWeakAgainst: string[]
  allStrongAgainst: string[]
  teamMainRole: PokeTeamMainRole
  recommendAddType: string[]
  recommendAddRole: PokeTeamMainRole
}

export type { PokemonRole, Pokemon, PokemonTeam, PokeTeamMainRole }
