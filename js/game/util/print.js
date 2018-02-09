import { settings } from '../config';
export const print = param => settings.debugMode ? console.log(param) : void (0)
export const printErr = param => settings.debugMode ? console.error(param) : void (0)
