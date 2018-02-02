export const assign = (target, ...sources) => sources.forEach(source => Object.keys(source).forEach(key => source[key] != undefined ? target[key] = source[key] : void (0)));
