import express, { Request, Response } from "express";
import * as TeamService from "./teams.service";
import { Team } from "./team.interface";
import { Teams } from "./teams.interface";
import { addUserToTheirTeam } from "../utils/helpers";
import * as ScoreService from "../scores/scores.service";
import { Score } from "../scores/score.interface";
import { Scores } from "../scores/scores.interface";

export const teamsRouter = express.Router();


// GET teams/
teamsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const teams: Teams = await TeamService.findAll();
        res.status(200).send(teams);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET teams/:id
teamsRouter.get("/:id", async (req: Request, res: Response) => {
    const teamId: number = parseInt(req.params.id, 10);
    try {
        const team: Team = await TeamService.find(teamId);
        res.status(200).send(team);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET teams/city/:id
teamsRouter.get("/city/:id", async (req: Request, res: Response) => {
    const cityId: number = parseInt(req.params.id, 10);
    try {
        const teams: Teams = await TeamService.findAllByCity(cityId);
        res.status(200).send(teams);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST teams/
teamsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const team: Team = req.body.team;
        const createdTeam: any = await TeamService.create(team);
        if (createdTeam) {
            const captainIdtoUserId: object = {id: team.captain_id};
            const initialScoreInfo: Scores = [{team_id: createdTeam.id, score: 1000}]
            const userAddedToTeam: any = await addUserToTheirTeam(captainIdtoUserId, createdTeam);
            const createdScore: any = await ScoreService.create(initialScoreInfo);
        }
        res.status(201).send(createdTeam);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT teams/
teamsRouter.put("/", async (req: Request, res: Response) => {
    try {
        const team: Team = req.body.team;
        const updatedTeam = await TeamService.update(team);
        res.status(200).send(updatedTeam);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE teams/:id
teamsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const teamId: number = parseInt(req.params.id, 10);
        const deletedTeam = await TeamService.remove(teamId);
        res.status(200).send(deletedTeam);
    } catch (e) {
        res.status(500).send(e.message);
    }
});