import { useEffect, useState } from 'react'
import { TYPE_COLORS } from './utils/poketypes'
import type { Pokemon, PokemonTeam } from './utils/poketypes'
import { computeTeamStats } from './handlers/team_handler'
import PokeSearchBar from './components/TeamBuilder/PokeSearchBar'
import PokeTeamList from './components/TeamBuilder/PokeTeamList'
import PokeTeamAnalysis from './components/TeamAnalysis/PokeTeamAnalysis'

const INITIAL_TEAM: PokemonTeam = {
  pokemonList: [],
  length: 0,
  totalAttackers: 0,
  totalDefenders: 0,
  totalPhysicalAttackers: 0,
  totalSpecialAttackers: 0,
  totalPhysicalDefenders: 0,
  totalSpecialDefenders: 0,
  allTeamTypes: [],
  allWeakAgainst: [],
  allStrongAgainst: [],
  teamMainRole: 'Balanced',
  recommendAddType: [],
  recommendAddRole: 'Balanced'
}

export default function App() {
  const [team, setTeam] = useState<PokemonTeam>(INITIAL_TEAM)
  const [error, setError] = useState('')

  const handleAdd = async (pokemon: Pokemon) => {
    if (team.length >= 6) {
      setError('Team is full (max 6).')
      return
    }

    if (team.pokemonList.find(p => p.name.toLowerCase() === pokemon.name.toLowerCase())) {
      setError('Already on your team.')
      return
    } else {
      setError('')
    }

    const updated = await computeTeamStats([...team.pokemonList, pokemon])
    setTeam(updated)
  }

  const handleRemove = async (name: string) => {
    const updatedList = team.pokemonList.filter(p => p.name !== name)
    const updated = await computeTeamStats(updatedList)
    setTeam(updated)
  }

  return (
    <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-[#091526] to-[#0d2040] font-[Poppins,sans-serif]">
      <header className="flex w-full justify-center border-b-[3px] border-[#1a3a6a] bg-[#091526] py-5">
        <img src="/PokeLogo.svg" alt="Pokémon Team Builder" className="h-18" />
        <h1 className="ml-3 pt-3 text-6xl font-extrabold text-[#84B9F9]">Team Builder</h1>
      </header>

      <div className="mt-1 flex w-full max-w-5xl gap-5 p-5">
        <div className="w-1/2 rounded-lg bg-[#192C56] p-5">
          <h2 className="mb-4 bg-[#192C56] text-2xl font-bold text-[#84B9F9]">Your Team</h2>
          <PokeSearchBar team={team.pokemonList} onAdd={handleAdd} />
          <PokeTeamList team={team.pokemonList} onRemove={handleRemove} />
        </div>
        <PokeTeamAnalysis team={team} />
      </div>
    </div>
  )
}
