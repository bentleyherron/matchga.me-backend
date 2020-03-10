import express, { Request, Response } from "express";
import * as FavoriteSportService from "./favoriteSports.service";
import { FavoriteSport } from "./favoriteSport.interface";
import { FavoriteSports } from "./favoriteSports.interface";
import { Team } from "../teams/team.interface";
import * as TeamService from "../teams/teams.service";

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

// DELETE favorite-sports/user
favoriteSportsRouter.delete("/user", async (req: Request, res: Response) => {
    const userId: number = parseInt(req.body.userAuth.userId, 10);
    let favoriteSports: any = req.body.favoriteSports;
    favoriteSports = favoriteSports.map((favoriteSport: FavoriteSport) => {
        favoriteSport.user_id = userId
        return favoriteSport;
    });
    try {
        const deletedFavoriteSport: object[] = await Promise.all(favoriteSports.map(async (favoriteSport: FavoriteSport) => {
            return await FavoriteSportService.remove(favoriteSport)
        }));
        const deletedRows: any = deletedFavoriteSport.map((item: any) => item.rows);
        res.status(200).send(deletedRows);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE favorite-sports/team
favoriteSportsRouter.delete("/team", async (req: Request, res: Response) => {
    const userId: number = parseInt(req.body.userAuth.userId, 10);
    const favoriteSports: any = req.body.FavoriteSports;
    const FavoriteSportsCaptains: number[] = await Promise.all(favoriteSports.map(async (favoriteSport: FavoriteSport) => {
        if (favoriteSport.team_id) {
            const team: Team = await TeamService.find(favoriteSport.team_id);
            return team.captain_id;
        }
    })); 
    try {
        const deletedFavoriteSport: object[] = await Promise.all(favoriteSports.map(async (favoriteSport: FavoriteSport) => {
            if (userId in FavoriteSportsCaptains) {
                return await FavoriteSportService.remove(favoriteSport)
            }
        }));
        const deletedRows: any = deletedFavoriteSport.map((item: any) => item.rows);
        res.status(200).send(deletedRows);
    } catch (e) {
        res.status(500).send(e.message);
    }
});