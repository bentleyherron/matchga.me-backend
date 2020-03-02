import { FavoriteSport } from "./favoriteSport.interface";
import { FavoriteSports } from "./favoriteSports.interface";
import { db } from '../db/connect';

/**
 * Service Methods
 */

// Find all teams a player is a member of
export const findAllPlayerSports = async (user_id: number): Promise < FavoriteSports > => {
    try {
        const sports: any = await db.any(`select * from favorite_sports where user_id=$1;`, [user_id]);
        return sports;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No favorite sports found for that player");
};

// Find all members of a single team
export const findAllTeamSports = async (team_id: number): Promise < FavoriteSports > => {
    try {
        const sports: any = await db.any(`select * from favorite_sports where team_id=$1;`, [team_id]);
        return sports;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No favorite sports found for that team");
};

// Add a favorite sport
export const add = async (favoriteSport: FavoriteSport): Promise < void > => {
    try {
        const result: any = await db.one(`insert into favorite_sports (sport_id, player_id, team_id) values ($1, $2, $3) returning id`, 
                                    [favoriteSport.sport_id, favoriteSport.user_id || null, favoriteSport.team_id || null])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }
};

// Removes a favorite sport
export const remove = async (favorite_Sport_id: number): Promise < void > => {
    try {
        const record: any = await db.result(`delete from favorite_sports where id=$1`, [favorite_Sport_id])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to delete");
};