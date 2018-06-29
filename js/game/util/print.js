import { settings } from '../config';

export const print = param => (settings.debugMode ? console.log(param) : undefined);
export const printErr = param => (settings.debugMode ? console.error(param) : undefined);
