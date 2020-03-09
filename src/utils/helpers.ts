import * as UserService from "../users/users.service";
import * as TeamService from "../teams/teams.service";
import * as TeamMemberService from "../team_members/teamMembers.service";
import { User } from "../users/user.interface";
import { Team } from "../teams/team.interface";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TeamMembers } from "../team_members/teamMembers.interface";


export async function createUserTeam(userCreated: any) {
    const userInfo: User = await UserService.find(userCreated.id);

    const teamInfo: Team = {
        id: 0o0,
        name: userInfo.username,
        city_id: userInfo.city_id,
        captain_id: userInfo.id,
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
    const teamMemberObj: TeamMembers = [{
        player_id: userCreated.id,
        team_id: teamCreated.id
    }];
    const teamMemberAdded: any = await TeamMemberService.create(teamMemberObj)
    
    if (teamMemberAdded) {
        return teamMemberAdded
    }
};

export const Helper = {

  hashPassword(password: string): string {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8))
  },

  comparePassword(hashPassword: string, password: string): boolean {
    return bcrypt.compareSync(password, hashPassword);
  },

  isValidEmail(email: string): boolean {
    return /\S+@\S+\.\S+/.test(email);
  },

  generateToken(uuid: string): string {
    const secret: any = process.env.JWT_SECRET;
    const token = jwt.sign({userId: uuid}, secret, { expiresIn: '7d' });
    return token;
  }
};