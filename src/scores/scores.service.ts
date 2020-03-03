import { Score } from "./score.interface";
import { Scores } from "./scores.interface";
import { db } from '../db/connect';

/**
 * Service Methods
 */

// Find all scores
export const findAll = async (): Promise < Scores > => {
    try {
        const scores: Scores = await db.any(`select * from scores;`);
        return scores;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No records found");
};

// Find all team scores
export const findAllTeamScores = async (team_id: number): Promise < Scores > => {
    try {
        const scores: Scores = await db.any(`select * from scores where team_id=$1;`, [team_id]);
        return scores;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No records found");
};

// Find a event score
export const findEventScore = async (event_id: number): Promise < Score > => {
    try {
        const score: Score = await db.one(`select * from scores where event_id=$1;`, [event_id]);

        if (score) {
            return score;
        };

    } catch (err) {
        console.log(err)
    }
    
    throw new Error("No record found");
};

// Create a score entry
export const create = async (score: Score): Promise < void > => {
    try {
        const result: any = await db.one(`insert into scores (team_id, event_id, score) 
                                            values ($1, $2, $3) 
                                        returning row`, 
                                    [score.team_id, score.event_id, score.score])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }
};

// Update a score
export const update = async (updatedScore: Score): Promise < void > => {
    try {
        const result: any = await db.result(`update scores set score=$1 where event_id=$2 returning row`, 
                        [updatedScore.score, updatedScore.event_id])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to update");
};

// Removes a score
export const remove = async (scoreInfo: Score): Promise < void > => {
    try {
        const record: any = await db.result(`delete from scores where team_id=$1 and event_id=$2`, [scoreInfo.team_id, scoreInfo.event_id])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to delete");
};