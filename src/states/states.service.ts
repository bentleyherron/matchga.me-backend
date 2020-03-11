import { States } from "./states.interface";
import { Cities } from "./cities.interface";
import { db } from '../db/connect';
import { City } from "./city.interface";
import { State } from "./state.interface";

/**
 * Service Methods
 */

// Get all states
export const getAllStates = async (): Promise < States > => {
    try {
        const states: States = await db.any(`select * from us_states`);
        return states;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No states found");
};

// Get state info
export const getStateInfo = async (stateId: number): Promise < States > => {
    try {
        const state: any = await db.any(`select * from us_states where id=$1`, [stateId]);
        return state;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No state info found");
};

// Find all cities from a state
export const getAllCitiesFromState = async (state_id: number): Promise < Cities > => {
    try {
        const cities: Cities = await db.any(`select * from us_cities where state_id=$1;`, [state_id]);
        return cities;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No cities found for that state");
};

// Get city info by id
export const getCityInfo = async (cityId: number): Promise < City > => {
    try {
        const city: City = await db.any(`select * from us_cities where id=$1;`, [cityId]);
        return city;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No city found");
};