import { db } from '../db/connect';
import { Teams } from '../teams/teams.interface';
import { TeamProfiles } from '../profile/teamProfiles.interface';
import * as ProfileService from "../profile/profile.service";


/**
 * Service Methods
 */

// Find all teams by city_id
export const getCityTeams = async (cityId: number): Promise < Teams > => {
    try {
        const teams: any = await db.any(`select * from teams where city_id=$1;`, [cityId]);
        console.log(teams);
        const teamProfiles: any = await Promise.all(await teams.map(async (team: any) => await ProfileService.getTeamProfile(team.id)));
        return teamProfiles;
    } catch (err) {
        console.log(err)
    }

    throw new Error("No team records found for that city");
};