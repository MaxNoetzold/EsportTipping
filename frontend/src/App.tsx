import { useQuery } from "@tanstack/react-query";
import getMatchesApi from "./api/getMatchesApi";

function App() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["matches", "spring"],
    queryFn: () => getMatchesApi("2024_spring"),
  });

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
