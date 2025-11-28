import { List } from "@raycast/api";
import SearchListItem from "./SearchListItem";
import { Definition } from "../interfaces";
import { Dispatch, SetStateAction } from "react";

type Props = { results: Definition[] | undefined; isLoading: boolean; setSearchText: Dispatch<SetStateAction<string>>; }

export default ({ results, isLoading, setSearchText }: Props) => {
    return (
        <List isLoading={isLoading} onSearchTextChange={setSearchText} searchBarPlaceholder="Search npm packages…" throttle>
            <List.Section title="Results" subtitle={results?.length.toString()}>
                {results?.map((definition) => <SearchListItem key={definition.id} definition={definition} />)}
            </List.Section>
        </List>
    );
}