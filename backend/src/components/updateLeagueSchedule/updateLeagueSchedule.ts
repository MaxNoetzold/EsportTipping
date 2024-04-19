import { IGameEvent } from "../../utils/types/GameEvent";
import fetchLeagueSchedule from "./fetchLeagueSchedule";
import updateGameEventsInDatabase from "./updateGameEventsInDatabase";

const updateLeagueSchedule = async (leagueSlug: string) => {
  const events: Array<IGameEvent> | undefined = await fetchLeagueSchedule(
    leagueSlug
  );
  if (!events) {
    throw new Error("No events found at lolesports");
  }
  if (events.length) {
    // This assumes that the array is ordered by date
    // Currently this is the case, but if it changes, this will break
    const currentSplit = events[events.length - 1].tournament.slug;
    const currentSplitEvents: Array<IGameEvent> = events.filter(
      (event) => event.tournament.slug === currentSplit
    );

    await updateGameEventsInDatabase(currentSplitEvents);
  }
};

export default updateLeagueSchedule;
