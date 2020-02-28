import express, { Request, Response } from "express";
import * as TeamService from "./teams.service";
import { Team } from "./team.interface";
import { Teams } from "./teams.interface";

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
    const id: number = parseInt(req.params.id, 10);
    try {
        const team: Team = await TeamService.find(id);
        res.status(200).send(team);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// POST teams/
teamsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const team: Team = req.body.team;
        await TeamService.create(team);
        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT teams/
teamsRouter.put("/", async (req: Request, res: Response) => {
    try {
        const team: Team = req.body.team;
        await TeamService.update(team);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE teams/:id
teamsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await TeamService.remove(id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});