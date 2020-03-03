import express, { Request, Response } from "express";
import * as FavoriteSportService from "./favoriteSports.service";
import { FavoriteSport } from "./favoriteSport.interface";
import { FavoriteSports } from "./favoriteSports.interface";

export const favoriteSportsRouter = express.Router();


// GET favorite-sports/player/:id (Find all favorite sports for a player)
favoriteSportsRouter.get("/player/:id", async (req: Request, res: Response) => {
    const playerId: number = parseInt(req.params.id, 10);
    try {
        const sports: FavoriteSports = await FavoriteSportService.findAllPlayerSports(playerId);
        res.status(200).send(sports);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET favorite-sports/team/:id (Find all players that are members of a team)
favoriteSportsRouter.get("/team/:id", async (req: Request, res: Response) => {
    const teamId: number = parseInt(req.params.id, 10);
    try {
        const sports: FavoriteSports = await FavoriteSportService.findAllTeamSports(teamId);
        res.status(200).send(sports);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST favorite-sports/
favoriteSportsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const sports: FavoriteSports = req.body.favoriteSports;
        const createdFavoriteSport: any = await FavoriteSportService.add(sports);
        res.status(201).send(createdFavoriteSport);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// DELETE favorite-sports/:id
favoriteSportsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const favoriteSportId: number = parseInt(req.params.id, 10);
        await FavoriteSportService.remove(favoriteSportId);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});