import { Team } from "./team.interface";
import { Teams } from "./teams.interface";
import { db } from '../db/connect';

/**
 * Service Methods
 */

// Find all teams
export const findAll = async (): Promise < Teams > => {
    try {
        const teams: Teams = await db.any(`select * from teams;`);
        return teams;
    } catch (err) {
        console.log(err)
        return [];
    }
};

// Find a single team
export const find = async (id: number): Promise < Team > => {
    try {
        const record: Team = await db.one(`select * from teams where id=$1;`, [id]);

        if (record) {
            return record;
        };

    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found");
};

// Create a team
export const create = async (newTeam: Team): Promise < void > => {
    try {
        const result: any = await db.one(`insert into teams (name, city_id, rating, photo, captain_id, creation_date, is_solo) 
                                            values ($1, $2, $3, $4, $5, $6, $7) 
                                        returning id`, 
                                    [newTeam.name, newTeam.city_id, 5, newTeam.photo, newTeam.captain_id, new Date(), newTeam.is_solo || false])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }
};

// Update a team
export const update = async (updatedTeam: Team): Promise < void > => {
    try {
        const result: any = await db.result(`update teams set name=$1, city_id=$2, photo=$3, photo=$4 where id=$5`, 
                                            [updatedTeam.name, updatedTeam.city_id, updatedTeam.photo, updatedTeam.id])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to update");
};

// Removes a team
export const remove = async (id: number): Promise < void > => {
    try {
        const record: any = await db.result(`delete from teams where id=$1`, [id])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to delete");
};