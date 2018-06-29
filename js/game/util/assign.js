// Object.assign() to target where 'undefined' properties are not copied. sources is list of objects to copy from.
export default (target, ...sources) => sources.forEach(source => Object.keys(source).forEach(key => (source[key] != undefined ? target[key] = source[key] : void (0))));
