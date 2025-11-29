import { useFetch } from '@raycast/utils';
import type { Cache } from '@raycast/api';
import { getPreferenceValues } from "@raycast/api";
import { Definition } from '../interfaces';

/**
 * @see https://www.php.net/js/search.js
 * @see https://www.php.net/js/search-index.php?lang=en
 * 
 * Examples:
 * "copyright":["Copyright","PHP Manual","legalnotice"]
 * "function.array-find":["array_find","Returns the first element satisfying a callback function","refentry"]
 * "class.datetimeimmutable":["DateTimeImmutable","The DateTimeImmutable class","phpdoc:classref"]
 */

const loadDefinitions = (cache: Cache): { data: Definition[] | undefined, isLoading: boolean } => {
    const language = getPreferenceValues<Preferences>().language;

    const cachedDefinitions = cache.get(language);

    if (cachedDefinitions) {
        return {  data: JSON.parse(cachedDefinitions) as Definition[], isLoading: false }; ;
    }

    const {data, isLoading} = useFetch<Definition[]>(`https://www.php.net/js/search-index.php?lang=${language}`);

    cache.set(language, JSON.stringify(data));

    return { data, isLoading };
}

export default loadDefinitions;