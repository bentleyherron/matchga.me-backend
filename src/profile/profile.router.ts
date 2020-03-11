import express, { Request, Response } from "express";
import * as ProfileService from "./profile.service";
import { UserProfile } from "./userProfile.interface";
import { TeamProfile } from "./teamProfile.interface";
import * as TeamMemberService from "../team_members/teamMembers.service";

export const profileRouter = express.Router();


// GET profile/ (Get information about logged in player and create a profile)
profileRouter.get("/", async (req: Request, res: Response) => {
    // const playerId: number = parseInt(req.params.id, 10);
    const userId: number = parseInt(req.body.userAuth.userId, 10);
    try {
        const profile: UserProfile = await ProfileService.getPlayerProfile(userId);
        res.status(200).send(profile);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET profile/team/:id (Get information about a team and create a profile)
profileRouter.get("/team/:id", async (req: Request, res: Response) => {
    const userId: number = parseInt(req.body.userAuth.userId, 10);
    const teamId: number = parseInt(req.params.id, 10);
    const teams: any = await TeamMemberService.findAllPlayerTeams(userId);
    const verifiedTeamId = teams.filter((team: any) => team.team_id == teamId);
    if (verifiedTeamId.length >= 1) {
        try {
            const teamProfile: TeamProfile = await ProfileService.getTeamProfile(verifiedTeamId[0].team_id);
            res.status(200).send(teamProfile);
        } catch (e) {
            res.status(404).send(e.message);
        }
    } else {
        res.status(404).send("Could not get team infomation");
    }
});