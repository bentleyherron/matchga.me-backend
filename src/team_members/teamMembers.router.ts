import express, { Request, Response } from "express";
import * as TeamMemberService from "./teamMember.service";
import { TeamMember } from "./teamMember.interface";
import { TeamMembers } from "./teamMembers.interface";

export const teamMembersRouter = express.Router();


// GET team-members/player/:id (Find all teams that a player is a member of)
teamMembersRouter.get("/player/:id", async (req: Request, res: Response) => {
    const player_id: number = parseInt(req.params.id, 10);
    try {
        const teams: TeamMembers = await TeamMemberService.findAllPlayerTeams(player_id);
        res.status(200).send(teams);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET team-members/team/:id (Find all players that are members of a team)
teamMembersRouter.get("/team/:id", async (req: Request, res: Response) => {
    const team_id: number = parseInt(req.params.id, 10);
    try {
        const teams: TeamMembers = await TeamMemberService.findAllTeamMembers(team_id);
        res.status(200).send(teams);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST teams-members/
teamMembersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const team: TeamMember = req.body.team;
        await TeamMemberService.create(team);
        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// DELETE team-members/:id
teamMembersRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const player_id: number = parseInt(req.params.player_id, 10);
        const team_id: number = parseInt(req.params.team_id, 10);
        await TeamMemberService.remove(player_id, team_id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});