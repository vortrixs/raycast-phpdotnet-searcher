import { useFetch } from "@raycast/utils";
import { Definition } from "../interfaces";
import { useMemo } from "react";

export default (language: string): { definitions: Definition[]; isLoading: boolean } => {
    const { data, isLoading } = useFetch<string>(`https://www.php.net/js/search-index.php?lang=${language}`);

    const definitions = useMemo<Definition[]>(() => JSON.parse(data || "[]"), [data]);
    
    return { definitions, isLoading };
};