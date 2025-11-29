import { Cache } from "@raycast/api";
import { useMemo, useState } from "react";
import loadDefinitions from "./functions/loadPhpDefinitions";
import SearchList from "./components/SearchList";
import Fuse from 'fuse.js'
import { Definition } from "./interfaces";

const cache = new Cache();

export default function Command() {
  const [searchText, setSearchText] = useState("");

  const { data, isLoading } = loadDefinitions(cache);

  const fuse = useMemo(() => {
    if (!data) return null;

    return new Fuse(data, { keys: ['name', 'methodName', 'description'], includeScore: true });
  }, [data]);

  const results = useMemo(() => {
    if (!fuse || searchText.trim() === "") return undefined;

    const searchResults = fuse.search(searchText);

    if (searchResults.length === 0) return [{id: searchText, name: `Search for "${searchText}" on php.net`, type: 'no-result', description: '', tag: '',methodName: ''}];

    return searchResults
      .sort((resultA, resultB) => (resultA.score ?? 0) - (resultB.score ?? 0))
      .map(result => result.item);
  }, [fuse, searchText]) satisfies Definition[] | undefined;

  return <SearchList results={results} isLoading={isLoading} setSearchText={setSearchText} />;
}
