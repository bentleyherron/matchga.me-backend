import { TeamMember } from "./teamMember.interface";
import { TeamMembers } from "./teamMembers.interface";
import { db } from '../db/connect';


/**
 * Service Methods
 */

// Find all teams a player is a member of
export const findAllPlayerTeams = async (player_id: number): Promise < TeamMembers > => {
    try {
        const teams = await db.any(`select * from team_members where player_id=$1;`, [player_id]);
        return teams;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No teams found for that player");
};

// Find all members of a single team
export const findAllTeamMembers = async (team_id: number): Promise < TeamMembers > => {
    try {
        const teams = await db.any(`select * from team_members where team_id=$1;`, [team_id]);
        return teams;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No player found for that team");
};

// Create a team member
export const create = async (newTeamMember: TeamMember): Promise < void > => {
    try {
        const result: any = await db.one(`insert into team_members (player_id, team_id) values ($1, $2) returning *`, 
                                    [newTeamMember.player_id, newTeamMember.team_id])
        if (result) {
            return result;
        };
    } catch (err) {
        console.log(err)
    }
};

// Removes a team member
export const remove = async (player_id: number, team_id: number): Promise < void > => {
    try {
        const record: any = await db.result(`delete from team_members where player_id=$1 and team_id=$2`, [player_id, team_id])
        if (record) {
            return record;
        };
    } catch (err) {
        console.log(err)
    }

    throw new Error("No record found to delete");
};