import { map } from '.';
import { kmToM, print } from '../util';
import { Asteroid, AsteroidBelt, Planet } from '../models';

const convertRadius = planet => kmToM(planet.radius);
const convertCoords = (unit, coords) => {
	if (unit === 'km') {
		const c = coords;
		c.x = kmToM(c.x);
		c.y = kmToM(c.y);
		c.z = kmToM(c.z);
	}
};

const loadPlanets = (planets) => {
	if (!(planets instanceof Array)) return print('planets was not of Array');
	planets.forEach((planet) => {
		convertCoords('km', planet.coords);
		map.objects.push(new Planet({
			radius: convertRadius(planet),
			position: planet.coords,
			category: planet.classification,
		}));
	});
	return null;
};
const loadAsteroidBelts = (belts) => {
	if (!(belts instanceof Array)) return print('(asteroid) belts was not of Array');
	belts.forEach((belt) => {
		convertCoords(belt.unit, belt.coords);
		belt.asteroids.forEach((asteroid) => {
			convertCoords(asteroid.unit, asteroid.coords);
			convertRadius(asteroid);
		});
		belt.asteroids = belt.asteroids.map(asteroid => new Asteroid({
			radius: asteroid.radius,
			position: asteroid.coords,
		}));
		const obj = new AsteroidBelt({
			position: belt.coords,
			asteroids: belt.asteroids,
		});
		map.objects.push(obj);
	});
	return null;
};
const loadPlayer = (player) => {
	if (!player) return print('planets was not defined');
	convertCoords('km', player.position);
	const { position, rotation, ...rest } = player;
	map.player.player.position.set(player.position.x, player.position.y, player.position.z);
	map.player.player.rotation.set(player.rotation.x, player.rotation.y, player.rotation.z);
	map.player.player.userData = { ...map.player.player.userData, ...rest };

	return null;
};

export default (json) => {
	loadAsteroidBelts(json.asteroidBelts);
	loadPlanets(json.planets);
	loadPlayer(json.player);
};
