import { Definition } from "../interfaces.js";

const BASE_URL = "https://www.php.net";

export default (item: Definition, language: string): string =>
  item.type === "no-result"
    ? `${BASE_URL}/search.php?q=${encodeURIComponent(item.id)}&lang=${encodeURIComponent(language)}`
    : `${BASE_URL}/manual/${encodeURIComponent(language)}/${encodeURIComponent(item.id)}.php`;
