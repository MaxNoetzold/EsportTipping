import { useQuery } from "@tanstack/react-query";

function App() {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["matches", "spring"],
    queryFn: () => getMatchesApi("spring"),
  });

  return (
    <>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
    </>
  );
}

export default App;
