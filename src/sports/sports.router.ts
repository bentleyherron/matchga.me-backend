import express, { Request, Response } from "express";
import * as SportService from "./sports.service";
import { Sport } from "./sport.interface";
import { Sports } from "./sports.interface";


export const sportsRouter = express.Router();


// GET sports/
sportsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const sports: Sports = await SportService.findAll();
        res.status(200).send(sports);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET sport/:id
sportsRouter.get("/:id", async (req: Request, res: Response) => {
    const sportId: number = parseInt(req.params.id, 10);
    try {
        const sport: Sport = await SportService.find(sportId);
        res.status(200).send(sport);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST sport/
sportsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const sport: Sport = req.body.sport;
        const createdSport: any = await SportService.create(sport);
        res.status(201).send(createdSport);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT sport/
sportsRouter.put("/", async (req: Request, res: Response) => {
    try {
        const sport: Sport = req.body.sport;
        const updatedSport: any = await SportService.update(sport);
        res.status(200).send(updatedSport);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE sport/:id
sportsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const sportId: number = parseInt(req.params.id, 10);
        await SportService.remove(sportId);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});