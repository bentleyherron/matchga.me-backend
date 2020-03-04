import { Challenge } from "./challenge.interface";
import { Challenges } from "./challenges.interface";
import { db } from '../db/connect';


/**
 * Service Methods
 */

// Find all challenges
export const findAll = async (): Promise < Challenges > => {
    try {
        const challenges: Challenges = await db.any(`select * from challenges;`);
        return challenges;
    } catch (err) {
        console.log(err)
    }
    throw new Error("No records found");
};

// Find a single challenge
export const find = async (challengeId: number): Promise < Challenge > => {
    try {
        const challenge: Challenge = await db.one(`select * from challenges where id=$1;`, [challengeId]);

        if (challenge) {
            return challenge;
        };

    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found");
};

// Create an challenge
export const create = async (newChallenge: Challenge): Promise < void > => {
    try {
        const result: any = await db.one(`insert into challenges (team_from_id, team_to_id, city_id, sport_id, longitude, latitude, datetime, message, wager, is_accepted) 
                                            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) 
                                        returning *`, 
                                    [newChallenge.team_from_id, newChallenge.team_to_id, newChallenge.city_id, newChallenge.sport_id, newChallenge.longitude, newChallenge.latitude, newChallenge.datetime, newChallenge.message, newChallenge.wager, newChallenge.is_accepted || false])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("Challenge could not be created");
};

// Update an challenge
export const update = async (updatedChallenge: Challenge): Promise < void > => {
    try {
        const result: any = await db.result(`update challenges set team_from_id=$1, team_to_id=$2, city_id=$3, sport_id=$4, longitude=$5, latitude=$6, datetime=$7, message=$8, wager=$9, is_accepted=$10 where id=$11 returning id`, 
                                    [updatedChallenge.team_from_id, updatedChallenge.team_to_id, updatedChallenge.city_id, updatedChallenge.sport_id, updatedChallenge.longitude, updatedChallenge.latitude, updatedChallenge.datetime, updatedChallenge.message, updatedChallenge.wager, updatedChallenge.is_accepted, updatedChallenge.id])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to update");
};

// Removes an challenge
export const remove = async (challengeId: number): Promise < void > => {
    try {
        const record: any = await db.result(`delete from challenges where id=$1`, [challengeId])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to delete");
};