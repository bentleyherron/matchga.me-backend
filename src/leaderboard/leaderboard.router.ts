import express, { Request, Response } from "express";
import * as LeaderboardService from "./leaderboard.service";

export const leaderboardRouter = express.Router();


// GET profile/:id (Get information about a player and create a profile)
leaderboardRouter.get("/:id", async (req: Request, res: Response) => {
    const cityId: number = parseInt(req.params.id, 10);
    try {
        const teamProfiles: any = await LeaderboardService.getCityTeams(cityId);
        res.status(200).send(teamProfiles);
    } catch (e) {
        res.status(404).send(e.message);
    }
});