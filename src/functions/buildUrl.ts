import { Definition } from "../interfaces.js";

const BASE_URL = "https://www.php.net";

export default (definition: Definition, language: string): string =>
  definition.type === "no-result"
    ? `${BASE_URL}/search.php?q=${encodeURIComponent(definition.id)}&lang=${encodeURIComponent(language)}`
    : `${BASE_URL}/manual/${encodeURIComponent(language)}/${encodeURIComponent(definition.id)}.php`;
