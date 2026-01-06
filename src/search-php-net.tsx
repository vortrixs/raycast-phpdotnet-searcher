import { useEffect, useMemo, useState } from "react";
import Fuse from "fuse.js";
import { Definition } from "./interfaces";
import loadDefinitionList from "./functions/loadDefinitionList";
import { Action, ActionPanel, getPreferenceValues, List } from "@raycast/api";
import buildUrl from "./functions/buildUrl";
import createSubtitle from "./functions/createSubtitle";

export default function Command() {
  const [searchText, setSearchText] = useState("");
  const { language } = useMemo(() => getPreferenceValues<Preferences>(), []);
  const { definitions, isLoading } = loadDefinitionList(language);

  const fuse = useMemo(() => {
    if (definitions.length === 0) return null;

    return new Fuse(definitions, { keys: ["name", "methodName", "description"], includeScore: true });
  }, [definitions]);

  const results = useMemo(() => {
    if (!fuse || searchText.trim() === "") return undefined;

    const searchResults = fuse.search(searchText, { limit: 50 });

    if (searchResults.length === 0)
      return [
        {
          id: searchText,
          name: `Search for "${searchText}" on php.net`,
          type: "no-result",
          description: "",
          tag: "",
          methodName: "",
        },
      ];

    return searchResults
      .sort((resultA, resultB) => (resultA.score ?? 0) - (resultB.score ?? 0))
      .map((result) => result.item);
  }, [fuse, searchText]) satisfies Definition[] | undefined;

  return (
    <List
      isLoading={isLoading}
      onSearchTextChange={setSearchText}
      searchBarPlaceholder="Search php.net..."
      throttle
      selectedItemId="0"
    >
      <List.Section title="Results" subtitle={results?.length.toString()}>
        {results?.map((definition, index) => (
          <List.Item
            id={index.toString()}
            key={definition.id + definition.name}
            title={definition.name}
            subtitle={createSubtitle(definition)}
            actions={
              <ActionPanel>
                <Action.OpenInBrowser title="Open in Browser" url={buildUrl(definition, language)} />
              </ActionPanel>
            }
          />
        ))}
      </List.Section>
    </List>
  );
}
