import { Action, ActionPanel, getPreferenceValues, List } from "@raycast/api";
import buildUrl from "../functions/buildUrl";
import { Definition } from "../interfaces";

type Props = { definition: Definition };

export default ({ definition }: Props) => {
  const language = getPreferenceValues<Preferences>().language;

  return (
    <List.Item
      title={definition.name}
      subtitle={`${definition.type} • ${definition.description}`}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser title="Open in Browser" url={buildUrl(definition, language)} />
        </ActionPanel>
      }
    />
  );
};
