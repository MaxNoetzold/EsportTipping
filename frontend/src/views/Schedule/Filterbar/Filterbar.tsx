import { useEffect, useState } from "react";
import throttle from "../../../utils/throttle";
import LeagueFilter from "../../../components/LeagueFilter";

type FilterbarProps = {
  league: string | undefined;
  setLeague: (league: string) => void;
  tournament: string | undefined;
  setTournament: (tournament: string | undefined) => void;
};

function Filterbar(props: FilterbarProps) {
  const { league, setLeague, tournament, setTournament } = props;

  const [isVisible, setIsVisible] = useState(true);

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

  return (
    <div
      className={`bg-gray-950 border-b border-gray-700 p-4 flex justify-between items-center sticky w-full z-30 ${isVisible ? "" : "hidden"}`}
      style={{ top: "80.67px" }}
    >
      <LeagueFilter
        league={league}
        setLeague={setLeague}
        tournament={tournament}
        setTournament={setTournament}
        orientation="vertical"
      />
    </div>
  );
}

export default Filterbar;
