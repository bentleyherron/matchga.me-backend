import { Challenge } from "./challenge.interface";
import { Challenges } from "./challenges.interface";
import { db } from '../db/connect';
import * as TeamService from "../teams/teams.service";


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
    throw new Error("No challenge records found");
};

// Find all challenges
export const findAllByCity = async (cityId: number): Promise < Challenges > => {
    try {
        const challenges: object[] = await db.any(`select * from challenges where city_id=$1`, [cityId]);
        const challengesWithTeams: any = await Promise.all(challenges.map(async (challenge: any) => {
            const teamInfo = await TeamService.find(challenge.team_from_id);
            return {event, team_from_name: teamInfo.name};
        }));
        
        if (challengesWithTeams) {
            return challengesWithTeams;
        };
        
    } catch (err) {
        console.log(err)
    }
    throw new Error("No challenge records found");
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

    throw new Error("No challenge record found");
};

// Create an challenge
export const create = async (newChallenge: Challenge): Promise < void > => {
    try {
        const result: any = await db.one(`insert into challenges (title, team_from_id, team_to_id, city_id, sport_id, longitude, latitude, datetime, message, wager, is_accepted) 
                                            values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) 
                                        returning *`, 
                                    [newChallenge.title, newChallenge.team_from_id, newChallenge.team_to_id, newChallenge.city_id, newChallenge.sport_id, newChallenge.longitude, newChallenge.latitude, newChallenge.datetime, newChallenge.message, newChallenge.wager, newChallenge.is_accepted || false])
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
        const result: any = await db.result(`update challenges set team_from_id=COALESCE($1, team_from_id), team_to_id=COALESCE($2, team_to_id), city_id=COALESCE($3, city_id), sport_id=COALESCE($4, sport_id), longitude=COALESCE($5, longitude), latitude=COALESCE($6, latitude), datetime=COALESCE($7, datetime), message=COALESCE($8, message), wager=COALESCE($9, wager), is_accepted=COALESCE($10, is_accepted), title=COALESCE($11, title) where id=$12 returning id`, 
                                    [updatedChallenge.team_from_id, updatedChallenge.team_to_id, updatedChallenge.city_id, updatedChallenge.sport_id, updatedChallenge.longitude, updatedChallenge.latitude, updatedChallenge.datetime, updatedChallenge.message, updatedChallenge.wager, updatedChallenge.is_accepted, updatedChallenge.title, updatedChallenge.id])
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
        const record: any = await db.result(`delete from challenges where id=$1 RETURNING *`, [challengeId])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to delete");
};