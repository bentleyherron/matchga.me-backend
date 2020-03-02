import express, { Request, Response } from "express";
import * as ProfileService from "./profile.service";
import { Profile } from "./profile.interface";

export const profileRouter = express.Router();


// GET profile/:id (Get information about a player and create a profile)
profileRouter.get("/:id", async (req: Request, res: Response) => {
    const playerId: number = parseInt(req.params.id, 10);
    try {
        const profile: Profile = await ProfileService.getPlayerProfile(playerId);
        res.status(200).send(profile);
    } catch (e) {
        res.status(404).send(e.message);
    }
});