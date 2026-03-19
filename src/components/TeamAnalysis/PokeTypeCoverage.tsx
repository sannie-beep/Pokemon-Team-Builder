import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip } from 'chart.js'
import type { PokemonTeam } from '../../utils/poketypes'
import { TYPE_COLORS } from '../../utils/poketypes'

ChartJS.register(ArcElement, Tooltip)

type Props = { team: PokemonTeam }

export default function PokeTypeCoverage({ team }: Props) {
  const uniqueTypes = team.allTeamTypes
  const typeCounts: Record<string, number> = {}
  team.pokemonList.forEach(p => {
    p.types.forEach(t => {
      typeCounts[t] = (typeCounts[t] || 0) + 1
    })
  })
  const strongAgainst = team.allStrongAgainst
  const weakAgainst = team.allWeakAgainst

  const chartData = {
    labels: uniqueTypes.map(t => t.charAt(0).toUpperCase() + t.slice(1)),
    datasets: [
      {
        data: uniqueTypes.map(t => typeCounts[t]),
        backgroundColor: uniqueTypes.map(t => TYPE_COLORS[t] || '#888'),
        borderColor: '#c9a84c',
        borderWidth: 3
      }
    ]
  }

  const chartOptions = {
    plugins: {
      tooltip: {
        callbacks: {
          label: (ctx: any) => ` ${ctx.label}: ${ctx.parsed} pokemon`
        }
      }
    }
  }

  return (
    <section>
      <h3 className="font-poppins mb-2 text-xl font-extrabold text-[#0D1D40]">Type Coverage</h3>
      {team.length === 0 && (
        <p className="text-sm text-[#563F1A]">No Pokémon yet. Add some to see type coverage.</p>
      )}
      {team.length > 0 && (
        <div>
          <div style={{ width: '200px', margin: '0 auto 16px' }}>
            {uniqueTypes.length === 0 ? (
              <p className="text-center text-sm text-[#563F1A]">
                No types yet. Add some Pokémon to see coverage.
              </p>
            ) : (
              <div className="flex flex-col items-center justify-center">
                <p className="text-bold mb-2 text-center text-sm text-[#563F1A]">
                  Mouseover for info
                </p>
                <Pie data={chartData} options={chartOptions} />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-[#1a1000]">Strong Against:</span>
              {strongAgainst.length === 0 ? (
                <span className="text-sm text-[#563F1A]">None</span>
              ) : (
                strongAgainst.map(t => (
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
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-[#1a1000]">Weak Against:</span>
              {weakAgainst.length === 0 ? (
                <span className="text-sm text-[#563F1A]">None</span>
              ) : (
                weakAgainst.map(t => (
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
          </div>
        </div>
      )}
    </section>
  )
}
