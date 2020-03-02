import express, { Request, Response } from "express";
import * as FavoriteSportService from "./favoriteSport.service";
import { FavoriteSport } from "./favoriteSport.interface";
import { FavoriteSports } from "./favoriteSports.interface";

export const FavoriteSportsRouter = express.Router();


// GET favorite-sports/player/:id (Find all favorite sports for a player)
FavoriteSportsRouter.get("/player/:id", async (req: Request, res: Response) => {
    const player_id: number = parseInt(req.params.id, 10);
    try {
        const sports: FavoriteSports = await FavoriteSportService.findAllPlayerSports(player_id);
        res.status(200).send(sports);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET favorite-sports/team/:id (Find all players that are members of a team)
FavoriteSportsRouter.get("/team/:id", async (req: Request, res: Response) => {
    const team_id: number = parseInt(req.params.id, 10);
    try {
        const sports: FavoriteSports = await FavoriteSportService.findAllTeamSports(team_id);
        res.status(200).send(sports);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST favorite-sports/
FavoriteSportsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const favoriteSport: FavoriteSport = req.body.favoriteSport;
        await FavoriteSportService.add(favoriteSport);
        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// DELETE favorite-sports/:id
FavoriteSportsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const favorite_Sport_id: number = parseInt(req.params.id, 10);
        await FavoriteSportService.remove(favorite_Sport_id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});