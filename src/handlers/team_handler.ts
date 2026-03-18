import type { Pokemon, PokemonTeam, PokemonRole, PokeTeamMainRole } from '../utils/poketypes'
import { fetchRecommendedTypes } from './api_handler'

export async function computeTeamStats(team: Pokemon[]): Promise<PokemonTeam> {
  const totalAttackers = team.filter(
    p => p.role === 'special-attacker' || p.role === 'attacker'
  ).length

  const totalDefenders = team.filter(
    p => p.role === 'special-defender' || p.role === 'defender'
  ).length

  const totalPhysicalAttackers = team.filter(p => p.role === 'attacker').length
  const totalSpecialAttackers = team.filter(p => p.role === 'special-attacker').length
  const totalPhysicalDefenders = team.filter(p => p.role === 'defender').length
  const totalSpecialDefenders = team.filter(p => p.role === 'special-defender').length

  const allTeamTypes = Array.from(new Set(team.flatMap(p => p.types || []).filter(Boolean)))
  const weakCounts: Record<string, number> = {}
  const strongCounts: Record<string, number> = {}

  team.forEach(p => {
    ;(p.weakTo || []).forEach(t => (weakCounts[t] = (weakCounts[t] || 0) + 1))
    ;(p.strongAgainst || []).forEach(t => (strongCounts[t] = (strongCounts[t] || 0) + 1))
  })

  const allWeakAgainst = Object.keys(weakCounts).filter(t => weakCounts[t] > (strongCounts[t] || 0))
  const allStrongAgainst = Object.keys(strongCounts).filter(
    t => strongCounts[t] > (weakCounts[t] || 0)
  )

  let teamMainRole: PokeTeamMainRole
  let recommendAddRole: PokeTeamMainRole = 'Balanced'

  if (totalAttackers > totalDefenders) {
    teamMainRole = 'Attacker'
    recommendAddRole = 'Defender'
  } else if (totalDefenders > totalAttackers) {
    teamMainRole = 'Defender'
    recommendAddRole = 'Attacker'
  } else {
    teamMainRole = 'Balanced'
  }

  let recommendAddType: string[] = []
  try {
    if (allWeakAgainst.length > 0) {
      recommendAddType = await fetchRecommendedTypes(allWeakAgainst)
    }
  } catch (error) {
    console.error('Failed to fetch recommended types:', error)
    recommendAddType = []
  }

  return {
    pokemonList: team,
    length: team.length,
    totalAttackers,
    totalDefenders,
    totalPhysicalAttackers,
    totalSpecialAttackers,
    totalPhysicalDefenders,
    totalSpecialDefenders,
    allTeamTypes,
    allWeakAgainst,
    allStrongAgainst,
    teamMainRole,
    recommendAddType,
    recommendAddRole
  }
}
