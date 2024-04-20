import { useEffect, useState } from "react";
import throttle from "../../../utils/throttle";
import { useQuery } from "@tanstack/react-query";
import getTournamentsApi from "../../../api/getTournamentsApi";
import { useErrorSnackbar } from "../../../components/ErrorSnackbar";

const leagues = [
  { value: "lec", label: "LEC", default: true },
  { value: "msi", label: "MSI" },
];
type FilterbarProps = {
  league: string | undefined;
  setLeague: (league: string) => void;
  tournament: string | undefined;
  setTournament: (tournament: string | undefined) => void;
};

function Filterbar(props: FilterbarProps) {
  const showError = useErrorSnackbar();

  const { league, setLeague, tournament, setTournament } = props;

  const [isVisible, setIsVisible] = useState(true);

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
      showError(tournamentsError.message);
    }
  }, [showError, tournamentsError]);

  /*
    Allow to hide the Filterbar
    when the user scrolls down it hides, when he scrolls up again it gets visible
  */
  useEffect(() => {
    const rootElement = document.getElementById("root");

    if (rootElement) {
      let lastScrollTop = 0;
      const handleScroll = throttle(() => {
        const st = rootElement.scrollTop;
        if (st > lastScrollTop) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        lastScrollTop = st <= 0 ? 0 : st;
      }, 100);

      rootElement.addEventListener("scroll", handleScroll);
      return () => {
        rootElement.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

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

  return (
    <div
      className={`bg-gray-950 border-b border-gray-700 p-4 flex justify-between items-center sticky w-full z-50 ${isVisible ? "" : "hidden"}`}
      style={{ top: "80.67px" }}
    >
      <div className="flex flex-row items-center space-y-0 space-x-4">
        <div className="flex flex-col w-36">
          <label className="text-white mb-2">League:</label>
          <select
            value={league}
            onChange={(e) => setLeague(e.target.value)}
            className="block appearance-none w-full bg-gray-800 text-white border border-gray-600 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          >
            {leagues.map((league) => (
              <option key={league.value} value={league.value}>
                {league.label}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col w-40">
          <label className="text-white mb-2">Tournament:</label>
          <select
            value={tournament}
            onChange={(e) => setTournament(e.target.value)}
            disabled={!league}
            className="block appearance-none w-full bg-gray-800 text-white border border-gray-600 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
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
    </div>
  );
}

export default Filterbar;
