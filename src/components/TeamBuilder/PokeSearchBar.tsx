import { useState } from 'react'
import { fetchPokemon } from '../../handlers/api_handler'
import type { Pokemon } from '../../utils/poketypes'

type Props = {
  team: Pokemon[]
  onAdd: (pokemon: Pokemon) => void
}

export default function PokeSearchBar({ team, onAdd }: Props) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSearch = async () => {
    const trimmed = input.trim().toLowerCase()
    if (!trimmed) return

    if (team.length >= 6) {
      setError('Team is full (max 6).')
      return
    }

    if (team.find(p => p.name.toLowerCase() === trimmed)) {
      setError('Already on your team.')
      return
    }

    setLoading(true)
    setError('')

    try {
      const pokemonData = await fetchPokemon(trimmed)
      onAdd(pokemonData)
      setInput('')
    } catch {
      setError('Not found. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="w-full">
      <p className="mb-2 text-[0.8rem] text-[#7aa8d8]">Enter Pokemon name to search</p>

      <div className="relative">
        <input
          type="text"
          className={`w-full rounded-lg border-2 bg-[#06101e] px-2.5 py-[7px] text-[0.88rem] text-white transition-colors outline-none ${error ? 'border-red-500/50' : 'border-[#2a4a7f] focus:border-blue-400'} ${loading ? 'cursor-not-allowed opacity-70' : 'cursor-text'} `}
          value={input}
          disabled={loading}
          placeholder={loading ? 'Searching...' : 'e.g. Pikachu'}
          onChange={e => {
            setInput(e.target.value)
            if (error) setError('')
          }}
          onKeyDown={e => e.key === 'Enter' && handleSearch()}
        />

        {/* Optional: Add a small spinner or indicator inside the bar if loading */}
        {loading && (
          <div className="absolute top-1/2 right-3 -translate-y-1/2">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-400 border-t-transparent"></div>
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-[0.78rem] font-medium text-[#e05555]">{error}</p>}
    </div>
  )
}
