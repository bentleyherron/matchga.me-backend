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

    throw new Error("No records found");
};

// Find sport
export const find = async (sport_id: number): Promise < Sport > => {
    try {
        const sport: Sport = await db.any(`select * from sports where id=$1;`, [sport_id]);
        return sport;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No records found");
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
};

// Update a sport
export const update = async (updatedSport: Sport): Promise < void > => {
    try {
        const result: any = await db.result(`update sports set name=$1 where id=$2 returning *`, 
                        [updatedSport.name, updatedSport.id])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to update");
};

// Removes a sport
export const remove = async (sport: Sport): Promise < void > => {
    try {
        const record: any = await db.result(`delete from sports where id=$1 and name=$2`, [sport.id, sport.name])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to delete");
};