import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useErrorSnackbar } from "../ErrorSnackbar";
import getTournamentsApi from "../../api/getTournamentsApi";
import leagues from "../../utils/constants/leagues";

type FilterbarProps = {
  league: string | undefined;
  setLeague: (league: string) => void;
  tournament: string | undefined;
  setTournament: (tournament: string | undefined) => void;
  orientation: "horizontal" | "vertical";
};

function LeagueFilter(props: FilterbarProps) {
  const showError = useErrorSnackbar();

  const {
    league,
    setLeague,
    tournament,
    setTournament,
    orientation = "horizontal",
  } = props;

  // Query the tournaments for the selected league
  const {
    isPending: tournamentsIsPending,
    data: tournaments,
    error: tournamentsError,
  } = useQuery({
    queryKey: ["tournaments", league],
    enabled: !!league,
    queryFn: async () => {
      if (league) {
        return getTournamentsApi(league);
      }
      throw new Error("No league selected");
    },
  });
  useEffect(() => {
    if (tournamentsError) {
      showError(`LeagueFilter_tournamentError: ${tournamentsError.message}`);
    }
  }, [showError, tournamentsError]);

  useEffect(() => {
    // Reset tournament when league changes
    setTournament(undefined);

    if (!leagues.find((l) => l.value === league)) {
      const defaultLeague = leagues.find((l) => l.default);
      if (defaultLeague) {
        setLeague(defaultLeague.value);
      }
    }
  }, [league, setLeague, setTournament]);

  useEffect(() => {
    if (tournaments && !tournaments.find((t) => t === tournament)) {
      const defaultTournament = tournaments[tournaments.length - 1];
      if (defaultTournament) {
        setTournament(defaultTournament);
      }
    }
  }, [setTournament, tournament, tournaments]);

  let orientationClasses = "";
  if (orientation === "horizontal") {
    orientationClasses = "flex flex-row items-center";
  } else if (orientation === "vertical") {
    orientationClasses = "flex flex-col";
  }

  return (
    <div className="flex flex-row items-center space-y-0 space-x-4 mb-2 overflow-x-auto whitespace-nowrap">
      <div className={orientationClasses}>
        <label className="text-white mb-2 mr-2">League:</label>
        <select
          value={league}
          onChange={(e) => setLeague(e.target.value)}
          className="block appearance-none w-32 bg-gray-800 text-white border border-gray-600 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          {leagues.map((league) => (
            <option key={league.value} value={league.value}>
              {league.label}
            </option>
          ))}
        </select>
      </div>
      <div className={orientationClasses}>
        <label className="text-white mb-2 mr-2">Tournament:</label>
        <select
          value={tournament}
          onChange={(e) => setTournament(e.target.value)}
          disabled={!league}
          className="block appearance-none w-44 bg-gray-800 text-white border border-gray-600 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
        >
          {tournaments &&
            !tournamentsIsPending &&
            tournaments.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
}

export default LeagueFilter;
