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
    }

    throw new Error("No team records found");
};

// Find all teams by city_id
export const findAllByCity = async (cityId: number): Promise < Teams > => {
    try {
        const teams: Teams = await db.any(`select * from teams where city_id=$1`, [cityId]);
        return teams;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No team records found");
};

// Find a single team
export const find = async (teamId: number): Promise < Team > => {
    try {
        const record: Team = await db.one(`select * from teams where id=$1;`, [teamId]);
        const teamScores: any = await db.any('select * from scores where team_id=$1', [teamId]);
        let initalValue: number = 0;
        const totalScore: number = teamScores.reduce((total: number, item: any) => {return total + item.score}, initalValue);

        if (record) {
            record.team_score = totalScore;
            return record;
        };

    } catch (err) {
        console.log(err)
    }

    throw new Error("No team record found");
};

// Create a team
export const create = async (newTeam: Team): Promise < void > => {
    try {
        const result: any = await db.one(`insert into teams (name, city_id, captain_id, sport_id, rating, photo, creation_date, is_solo) 
                                            values ($1, $2, $3, $4, $5, $6, $7, $8) 
                                        returning *`, 
                                    [newTeam.name, newTeam.city_id, newTeam.captain_id, newTeam.sport_id, 5, newTeam.photo, new Date(), newTeam.is_solo || false])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("Could not create team");
};

// Update a team
export const update = async (updatedTeam: Team): Promise < void > => {
    try {
        const result: any = await db.result(`update teams set name=$1, city_id=$2, captain_id=$3, sport_id=$4, rating=$5, photo=$6 where id=$7 returning id`, 
                                            [updatedTeam.name, updatedTeam.city_id, updatedTeam.captain_id, updatedTeam.sport_id, updatedTeam.rating, updatedTeam.photo, updatedTeam.id])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No team record found to update");
};

// Removes a team
export const remove = async (id: number): Promise < void > => {
    try {
        const record: any = await db.result(`delete from teams where id=$1 RETURNING *`, [id])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No team record found to delete");
};