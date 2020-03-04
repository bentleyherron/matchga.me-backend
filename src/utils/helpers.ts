import * as UserService from "../users/users.service";
import * as TeamService from "../teams/teams.service";
import * as TeamMemberService from "../team_members/teamMembers.service";
import { User } from "../users/user.interface";
import { Team } from "../teams/team.interface";
import { TeamMember } from "../team_members/teamMember.interface";


export async function createUserTeam(userCreated: any) {
    const userInfo: User = await UserService.find(userCreated.id);

    const teamInfo: Team = {
        id: 0o0,
        name: userInfo.username,
        city_id: userInfo.city_id,
        captain_id: userInfo.id,
        sport_id: 0o0,
        photo: null,
        creation_date: userInfo.joined_date,
        rating: 0o0,
        is_solo: true
    };

    const teamCreated: any = await TeamService.create(teamInfo);

    if (teamCreated) {
        return teamCreated
    }
};

export async function addUserToTheirTeam(userCreated: any, teamCreated: any) {
    const teamMemberObj: TeamMember = {
        player_id: userCreated.id,
        team_id: teamCreated.id
    } 
    const teamMemberAdded: any = await TeamMemberService.create(teamMemberObj)
    
    if (teamMemberAdded) {
        return teamMemberAdded
    }
};