import { Sport } from "./sport.interface";
import { Sports } from "./sports.interface";
import { db } from '../db/connect';


/**
 * Service Methods
 */

// Find all sports
export const findAll = async (): Promise < Sports > => {
    try {
        const sports: Sports = await db.any(`select * from sports;`);
        return sports;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No sports records found");
};

// Find sport
export const find = async (sport_id: number): Promise < Sport > => {
    try {
        const sport: Sport = await db.any(`select * from sports where id=$1;`, [sport_id]);
        return sport;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No sport record found");
};

// Create a sport
export const create = async (sport: Sport): Promise < void > => {
    try {
        const result: any = await db.one(`insert into sports (name) values ($1) returning *`, [sport.name])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("Could not create sport");
};

// Update a sport
export const update = async (updatedSport: Sport): Promise < void > => {
    try {
        const result: any = await db.result(`update sports set name=COALESCE($1, name) where id=$2 returning id`, 
                        [updatedSport.name, updatedSport.id])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No sport record found to update");
};

// Removes a sport
export const remove = async (id: number): Promise < void > => {
    try {
        const record: any = await db.result(`delete from sports where id=$1 RETURNING *`, [id])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No sport record found to delete");
};