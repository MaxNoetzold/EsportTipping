import { useQuery } from "@tanstack/react-query";
import getMatchesApi from "../../api/getMatchesApi";
import Loading from "../../components/Loading";
import Alert from "../../components/Alert";
import MatchElement from "./MatchElement/MatchElement";
import { GameEvent } from "../../types/LecEvent";

function Schedule() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["matches", "spring"],
    queryFn: () => getMatchesApi("2024_spring"),
  });

  if (isPending) {
    return <Loading />;
  }

  if (isError && error) {
    return <Alert message={error.message} />;
  }

  return (
    <div className="w-full">
      {data.map((match: GameEvent) => (
        <MatchElement match={match} key={match.matchId} />
      ))}
    </div>
  );
}

export default Schedule;
