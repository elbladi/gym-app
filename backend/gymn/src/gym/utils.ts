import { FilteredGymDto } from "../dto/filtered.gym.dto";
import { GetGymDto } from "../dto/get.gym.dto";
import { FilterResult, ILocation } from "../types";

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    // Convert latitude and longitude from degrees to radians
    const lat1Rad = (Math.PI / 180) * lat1;
    const lon1Rad = (Math.PI / 180) * lon1;
    const lat2Rad = (Math.PI / 180) * lat2;
    const lon2Rad = (Math.PI / 180) * lon2;

    // Haversine formula
    const dlon = lon2Rad - lon1Rad;
    const dlat = lat2Rad - lat1Rad;
    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    // Radius of the Earth in meters
    const radius = 6371 * 1000;

    // Calculate the distance
    const distance = radius * c;
    return distance;
}

/**
 * Returns a list of Gym's Id that are at least 1km close to provided location
 * @param gyms
 * @param location
 */
export function filterGyms(gyms: GetGymDto[], location: ILocation): FilterResult {
    const maxDistance = 1 * 1000; // Maximum distance in meters. 1km
    const filteredList: FilteredGymDto[] = [];
    let farCounter = 0;

    for (const gym of gyms) {
        const distance = calculateDistance(location.lat, location.lon, gym.location.lat, gym.location.lon);
        if (distance <= maxDistance) {
            const validGym: FilteredGymDto = { ...gym, distance };
            filteredList.push(validGym);
        } else farCounter++;
    }

    return { gyms: filteredList, farCounter };
}
