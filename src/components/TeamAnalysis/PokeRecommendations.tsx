// components/PokeRecommendations.tsx
import type { PokemonTeam } from '../../utils/poketypes'
import { TYPE_COLORS } from '../../utils/poketypes'

type Props = { team: PokemonTeam }

export default function PokeRecommendations({ team }: Props) {
  const roleMessage =
    team.recommendAddRole === 'Attacker'
      ? { text: '[ROLES] Add more attacker pokémon', color: '#861F1F' }
      : team.recommendAddRole === 'Defender'
        ? { text: '[ROLES] Add more defender pokémon', color: '#0E4255' }
        : { text: 'Good job! Your team roles are balanced.', color: '#0E6352' }
  return (
    <section className="mb-4">
      <h3 className="font-poppins mb-2 text-xl font-extrabold text-[#0D1D40]">Recommendations</h3>
      {team.length === 0 && (
        <p className="text-sm text-[#563F1A]">No Pokémon yet. Add some to see recommendations.</p>
      )}
      {team.length > 0 && (
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-[#1a1000]">[TYPES] Add more:</span>
            {team.recommendAddType.length === 0 ? (
              <span className="text-sm text-[#563F1A]">None</span>
            ) : (
              team.recommendAddType.map(t => (
                <span
                  key={t}
                  className="text-sm font-medium text-[#1a1000]"
                  style={{
                    background: TYPE_COLORS[t] || '#777',
                    padding: '2px 6px',
                    borderRadius: '4px'
                  }}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </span>
              ))
            )}
          </div>
          <span className="text-sm font-semibold" style={{ color: roleMessage.color }}>
            {roleMessage.text}
          </span>
        </div>
      )}
    </section>
  )
}
