import { TYPE_COLORS } from '../../utils/poketypes'
import type { Pokemon } from '../../utils/poketypes'

interface Props {
  team: Pokemon[]
  onRemove: (name: string) => void
}

export default function PokeTeamList({ team, onRemove }: Props) {
  const slots = Array(6).fill(null)

  return (
    <div className="mt-4 space-y-3">
      {slots.map((_, i) => {
        const pokemon = team[i]

        if (!pokemon) {
          return (
            <div
              className="flex items-center justify-center rounded-lg border-2 border-dashed border-[#2a4a7f] p-3"
              key={'empty-' + i}
            >
              <span className="text-sm text-[#84B9F9]">Empty slot</span>
            </div>
          )
        }
        return (
          <div
            key={pokemon.name}
            className="group flex cursor-pointer items-center justify-between gap-3 overflow-hidden rounded-lg p-3"
            style={{
              background:
                pokemon.types.length === 1
                  ? TYPE_COLORS[pokemon.types[0]] || '#777'
                  : `linear-gradient(to right, ${pokemon.types
                      .map((type, i) => {
                        const color = TYPE_COLORS[type] || '#777'
                        const start = (i / pokemon.types.length) * 100
                        const end = ((i + 1) / pokemon.types.length) * 100
                        return `${color} ${start}%, ${color} ${end}%`
                      })
                      .join(', ')})`
            }}
            onClick={() => onRemove(pokemon.name)}
            title="Click to remove"
          >
            <span className="text-lg font-semibold text-[#0A284C] drop-shadow">{pokemon.name}</span>
            <span
              className="text-rgb(168, 104, 104) text-xl font-bold opacity-0 transition-opacity group-hover:opacity-100"
              style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}
            >
              ✕
            </span>
          </div>
        )
      })}
    </div>
  )
}
