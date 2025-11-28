import { Cache } from "@raycast/api";
import { useMemo, useState } from "react";
import loadDefinitions from "./functions/loadPhpDefinitions";
import SearchList from "./components/SearchList";
import Fuse from 'fuse.js'

const cache = new Cache();

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = loadDefinitions(cache);

  const results = useMemo(() => {
    if (!data || searchText.trim() === "" || isLoading) return undefined;

    const fuse = new Fuse(data, { keys: ['name', 'methodName', 'description'], includeScore: true });

    return fuse
      .search(searchText)
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
      .map(result => result.item);
  }, [data, searchText, isLoading]);

  return <SearchList results={results} isLoading={isLoading} setSearchText={setSearchText} />;
}
