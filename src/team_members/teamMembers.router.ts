import express, { Request, Response } from "express";
import * as TeamMemberService from "./teamMembers.service";
import { TeamMember } from "./teamMember.interface";
import { TeamMembers } from "./teamMembers.interface";

export const teamMembersRouter = express.Router();


// GET team-members/player/:id (Find all teams that a player is a member of)
teamMembersRouter.get("/player/:id", async (req: Request, res: Response) => {
    const playerId: number = parseInt(req.params.id, 10);
    try {
        const teams: TeamMembers = await TeamMemberService.findAllPlayerTeams(playerId);
        res.status(200).send(teams);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET team-members/team/:id (Find all players that are members of a team)
teamMembersRouter.get("/team/:id", async (req: Request, res: Response) => {
    const teamId: number = parseInt(req.params.id, 10);
    try {
        const teams: TeamMembers = await TeamMemberService.findAllTeamMembers(teamId);
        res.status(200).send(teams);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST teams-members/
teamMembersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const teamMembers: TeamMembers = req.body.teamMembers;
        const createdTeam: any = await TeamMemberService.create(teamMembers);
        res.status(201).send(createdTeam);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// DELETE team-members/
teamMembersRouter.delete("/", async (req: Request, res: Response) => {
    try {
        const teamMember: TeamMember = req.body.teamMember;
        const deletedTeamMember = await TeamMemberService.remove(teamMember);
        res.status(200).send(deletedTeamMember);
    } catch (e) {
        res.status(500).send(e.message);
    }
});