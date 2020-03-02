import { User } from "../users/user.interface";
import { TeamMembers } from "../team_members/teamMembers.interface";
import { FavoriteSports } from "../favorite_sports/favoriteSports.interface";

export interface Profile {
    userInfo: User;
    favoriteSports: FavoriteSports;
    teams: TeamMembers;
    teamScores: object[];
    totalScore?: number;
    eventHistory?: object[];
};