import express, { Request, Response } from "express";
import * as FavoriteSportService from "./favoriteSports.service";
import { FavoriteSport } from "./favoriteSport.interface";
import { FavoriteSports } from "./favoriteSports.interface";

export const favoriteSportsRouter = express.Router();


// GET favorite-sports/player/ (Find all favorite sports for logged in player)
favoriteSportsRouter.get("/player/", async (req: Request, res: Response) => {
    const userId: number = parseInt(req.body.userAuth.userId, 10);
    try {
        const sports: FavoriteSports = await FavoriteSportService.findAllPlayerSports(userId);
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
    const sports: any = req.body.favoriteSports;
    const userId: number = parseInt(req.body.userAuth.userId, 10);
    const userSports: FavoriteSports = sports.map((sport: FavoriteSport) => {
        sport.user_id = userId
        return sport;
    })
    try {
        const createdFavoriteSport: any = await FavoriteSportService.add(userSports);
        res.status(201).send(createdFavoriteSport);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// DELETE favorite-sports/:id
favoriteSportsRouter.delete("/", async (req: Request, res: Response) => {
    const userId: number = parseInt(req.body.userAuth.userId, 10);
    const favoriteSport: FavoriteSport = req.body.FavoriteSports;
    favoriteSport.user_id = userId;
    try {
        const deletedFavoriteSport = await FavoriteSportService.remove(favoriteSport);
        res.status(200).send(deletedFavoriteSport);
    } catch (e) {
        res.status(500).send(e.message);
    }
});