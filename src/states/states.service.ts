import { States } from "./states.interface";
import { Cities } from "./cities.interface";
import { db } from '../db/connect';

/**
 * Service Methods
 */

// Find all teams a player is a member of
export const getAllStates = async (): Promise < States > => {
    try {
        const states: States = await db.any(`select * from us_states`);
        return states;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No states found");
};

// Find all members of a single team
export const getAllCitiesFromState = async (state_id: number): Promise < Cities > => {
    try {
        const cities: Cities = await db.any(`select * from us_cities where state_id=$1;`, [state_id]);
        return cities;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No cities found for that state");
};