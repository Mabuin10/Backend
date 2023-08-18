import { fileURLToPath } from 'url';
import { dirname } from 'path';



export const __fileName = fileURLToPath(import.meta.url);
export const __dirName = dirname(__fileName);

export default {__dirName, __fileName};