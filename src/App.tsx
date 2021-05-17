import React from "react";
import useSWR from "swr";

const fetcher = (input: RequestInfo, init: RequestInit | undefined) =>
  fetch(input, init).then((res) => res.json());

function App() {
  const { data, error } = useSWR(
    "https://jsonp.afeld.me/?url=https://today.line.me/id/portaljson",
    fetcher
  );

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <div className="bg-blue-500 text-white min-h-screen w-full flex items-center justify-center text-5xl">
      LINE Heute
    </div>
  );
}

export default App;
