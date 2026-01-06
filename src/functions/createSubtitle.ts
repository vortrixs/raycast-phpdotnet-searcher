import { Definition } from "../interfaces";

export default (definition: Definition): string =>  definition.type === 'no-result'? '' : `${definition.type} • ${definition.description}`;
