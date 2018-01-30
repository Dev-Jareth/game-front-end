import { map } from "./";
import { kmToM } from "../util";
import { Planet } from "../models";
export const loadJsonToMap = json => {
  loadPlanets(json.planets)
  loadPlayer(json.player)
}
const loadPlanets = planets => {
  planets.forEach(planet => {
    convertCoords(planet.unit, planet.coords)
    convertRadius(planet)
    map.objects.push(new Planet({
      radius: planet.radius,
      position: planet.coords,
      class: planet.class
    }))
  })
}
const loadPlayer = player => {
  convertCoords(player.unit, player.coords)
  map.player.coords.set(player.coords)
  map.player.rotation.set(player.rotation)

}
const convertRadius = planet => {
  if (planet.unit === "km") {
    planet.radius = kmToM(planet.radius)
  }
}
const convertCoords = (unit, coords) => {
  if (unit === "km") {
    let c = coords
    c.x = kmToM(c.x);
    c.y = kmToM(c.y);
    c.z = kmToM(c.z);
  }
}
