import { Profile } from "./profile.interface";
import { db } from '../db/connect';

import * as UserService from "../users/users.service";
import { User } from "../users/user.interface";

import * as FavoriteSportService from "../favorite_sports/favoriteSports.service";
import { FavoriteSports } from "../favorite_sports/favoriteSports.interface";

import * as TeamMemberService from "../team_members/teamMember.service";
import { TeamMembers } from "../team_members/teamMembers.interface";


/**
 * Service Methods
 */

// Find all teams a player is a member of
export const getPlayerProfile = async (player_id: number): Promise < Profile > => {
    try {
        const userInfo: User = await UserService.find(player_id)
        const favoriteSports: FavoriteSports = await FavoriteSportService.findAllPlayerSports(player_id);
        const teams: TeamMembers = await TeamMemberService.findAllPlayerTeams(player_id);
        const teamScores: any = [];
        const totalScore: any = 0;
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