// components/PokeRoleCoverage.tsx
import type { PokemonTeam, PokeTeamMainRole } from '../../utils/poketypes'

type Props = { team: PokemonTeam }

export default function PokeRoleCoverage({ team }: Props) {
  const legend = [
    {
      label: 'Physical Attackers',
      count: team.totalPhysicalAttackers,
      dotColor: '#861F1F',
      textColor: '#861F1F'
    },
    {
      label: 'Special Attackers',
      count: team.totalSpecialAttackers,
      dotColor: '#7B2D8B',
      textColor: '#7B2D8B'
    },
    {
      label: 'Physical Defenders',
      count: team.totalPhysicalDefenders,
      dotColor: '#0E3A4A',
      textColor: '#0E3A4A'
    },
    {
      label: 'Special Defenders',
      count: team.totalSpecialDefenders,
      dotColor: '#0E6352',
      textColor: '#0E6352'
    }
  ]

  return (
    <section>
      <h3 className="font-poppins mb-2 text-xl font-extrabold text-[#0D1D40]">Role Coverage</h3>

      {team.length !== 0 && (
        <div className="mb-1 flex items-center gap-6">
          {/* Role icon + label */}
          {team.teamMainRole === 'Attacker' && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-extrabold text-[#861F1F]">Attacker-heavy</p>
              <img src="/Attacker.svg" alt="Attacker Icon" className="mt-1 h-30 w-30" />
            </div>
          )}
          {team.teamMainRole === 'Defender' && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-extrabold text-[#0E4255]">Defender-heavy</p>
              <img src="/Defender.svg" alt="Defender Icon" className="mt-1 h-30 w-30" />
            </div>
          )}
          {team.teamMainRole === 'Balanced' && (
            <div className="flex flex-col items-center justify-center">
              <p className="text-lg font-extrabold text-[#0E6352]">Balanced</p>
              <img src="/Balanced.svg" alt="Balanced Icon" className="mt-1 h-30 w-30" />
            </div>
          )}

          <div className="flex flex-col gap-2">
            {legend.map(({ label, count, dotColor, textColor }) => (
              <div key={label} className="flex items-center gap-2">
                <div className="flex gap-1">
                  {count === 0 ? (
                    <span
                      style={{
                        width: '14px',
                        height: '14px',
                        borderRadius: '50%',
                        border: `2px solid ${dotColor}`,
                        display: 'inline-block',
                        opacity: 0.3
                      }}
                    />
                  ) : (
                    Array.from({ length: count }).map((_, i) => (
                      <span
                        key={i}
                        style={{
                          width: '14px',
                          height: '14px',
                          borderRadius: '50%',
                          background: dotColor,
                          display: 'inline-block'
                        }}
                      />
                    ))
                  )}
                </div>
                <span style={{ color: textColor }} className="text-sm font-extrabold">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {team.length === 0 && (
        <p className="text-sm text-[#563F1A]">No Pokémon yet. Add some to see role coverage.</p>
      )}
    </section>
  )
}
