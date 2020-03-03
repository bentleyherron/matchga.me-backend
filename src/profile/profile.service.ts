import { Profile } from "./profile.interface";
import { db } from '../db/connect';
import * as UserService from "../users/users.service";
import { User } from "../users/user.interface";
import * as FavoriteSportService from "../favorite_sports/favoriteSports.service";
import { FavoriteSports } from "../favorite_sports/favoriteSports.interface";
import * as TeamMemberService from "../team_members/teamMembers.service";


/**
 * Service Methods
 */

// Find all teams a player is a member of
export const getPlayerProfile = async (player_id: number): Promise < Profile > => {
    try {
        const userInfo: User = await UserService.find(player_id)
        const favoriteSports: FavoriteSports = await FavoriteSportService.findAllPlayerSports(player_id);
        const teams: any = await TeamMemberService.findAllPlayerTeams(player_id);
        const teamScores: any = await db.any('select * from scores where team_id in (select team_id from team_members where player_id=$1)', [player_id]);
        let initalValue = 0;
        const totalScore: any = teamScores.reduce((total: number, item: any) => {return total + item.score}, initalValue);
        const eventHistory: any = [];
        const playerProfile: Profile = {
            userInfo,
            favoriteSports,
            teams,
            teamScores,
            totalScore,
            eventHistory
        };
        
        return playerProfile;
        
    } catch (err) {
        console.log(err)
    }

    throw new Error("Could not get profile information");
};