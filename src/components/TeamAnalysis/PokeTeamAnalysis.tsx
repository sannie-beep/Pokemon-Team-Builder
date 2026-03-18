import type { PokemonTeam } from '../../utils/poketypes'
import PokeTypeCoverage from './PokeTypeCoverage'
import PokeRoleCoverage from './PokeRoleCoverage'
import PokeRecommendations from './PokeRecommendations'

type Props = {
  team: PokemonTeam
}

export default function PokeTeamAnalysis({ team }: Props) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-5 rounded-[14px] border-2 border-[#a07830] bg-[rgba(230,207,106,0.84)] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.35)]">
      <PokeTypeCoverage team={team} />

      <div className="border-t-2 border-[#8b6414]" />
      <PokeRoleCoverage team={team} />

      <div className="border-t-2 border-[#8b6414]" />
      <PokeRecommendations team={team} />
    </div>
  )
}
