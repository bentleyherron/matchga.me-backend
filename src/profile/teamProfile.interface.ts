import { User } from "../users/user.interface";
import { TeamMembers } from "../team_members/teamMembers.interface";

export interface TeamProfile {
    team_id: number;
    team_name: string;
    team_members: TeamMembers;
    score: number;
    sport_id?: number;
    captain: User;
};