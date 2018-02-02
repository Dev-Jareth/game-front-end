import { map } from "./";
import { kmToM } from "../util";
import { Asteroid, AsteroidBelt, Planet } from "../models";
export const loadJsonToMap = json => {
  loadAsteroidBelts(json.asteroidBelts)
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
      category: planet.class
    }))
  })
}
const loadAsteroidBelts = belts => {
  belts.forEach(belt => {
    convertCoords(belt.unit, belt.coords)
    belt.asteroids.forEach(asteroid => {
      convertCoords(asteroid.unit, asteroid.coords)
      convertRadius(asteroid)
    })
    belt.asteroids = belt.asteroids.map(asteroid => new Asteroid({
      radius: asteroid.radius,
      position: asteroid.coords
    }))
    console.log(belt.asteroids);
    let obj = new AsteroidBelt({
      position: belt.coords,
      asteroids: belt.asteroids
    })
    map.objects.push(obj)
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
