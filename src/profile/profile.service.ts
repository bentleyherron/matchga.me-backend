import { UserProfile } from "./userProfile.interface";
import { db } from '../db/connect';
import * as UserService from "../users/users.service";
import { User } from "../users/user.interface";
import * as FavoriteSportService from "../favorite_sports/favoriteSports.service";
import { FavoriteSports } from "../favorite_sports/favoriteSports.interface";
import * as TeamService from "../teams/teams.service";
import * as TeamMemberService from "../team_members/teamMembers.service";
import { TeamProfile } from "./teamProfile.interface";
import { Team } from "../teams/team.interface";
import { TeamMembers } from "../team_members/teamMembers.interface";
import { TeamMember } from "../team_members/teamMember.interface";


/**
 * Service Methods
 */

// Find all teams a player is a member of
export const getPlayerProfile = async (player_id: number): Promise < UserProfile > => {
    try {
        const userInfo: User = await UserService.find(player_id);
        const favoriteSports: FavoriteSports = await FavoriteSportService.findAllPlayerSports(player_id);
        const teams: any = await TeamMemberService.findAllPlayerTeams(player_id);
        const teamScores: any = await db.any('select * from scores where team_id in (select team_id from team_members where player_id=$1)', [player_id]);
        let initalValue: number = 0;
        const totalScore: number = teamScores.reduce((total: number, item: any) => {return total + item.score}, initalValue);
        const eventHistory: any = [];
        const playerProfile: UserProfile = {
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

export const getTeamProfile = async (teamId: number): Promise < TeamProfile > => {
    try {
        const teamInfo: Team = await TeamService.find(teamId);
        const teamMemberProfiles: any = await db.any(`select * from users where id in (select player_id from team_members where team_id=$1)`, [teamId]);
        const teamScores: any = await db.any('select * from scores where team_id=$1', [teamId]);
        let initalValue: number = 0;
        const totalScore: number = teamScores.reduce((total: number, item: any) => {return total + item.score}, initalValue);
        const captainProfile: User = await UserService.find(teamInfo.captain_id);

        const teamProfile: TeamProfile = {
            team_id: teamInfo.id,
            team_name: teamInfo.name,
            team_photo: teamInfo.photo,
            team_members: teamMemberProfiles,
            score: totalScore,
            sport_id: teamInfo.sport_id,
            captain: captainProfile
        };
        
        return teamProfile;
        
    } catch (err) {
        console.log(err)
    }

    throw new Error("Could not get profile information");
};