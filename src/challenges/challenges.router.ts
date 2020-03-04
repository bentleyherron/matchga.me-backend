import express, { Request, Response } from "express";
import * as ChallengeService from "./challenges.service";
import { Challenge } from "./challenge.interface";
import { Challenges } from "./challenges.interface";

export const challengesRouter = express.Router();


// GET challenges/
challengesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const challenges: Challenges = await ChallengeService.findAll();
        res.status(200).send(challenges);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET challenges/:id
challengesRouter.get("/:id", async (req: Request, res: Response) => {
    const challengeId: number = parseInt(req.params.id, 10);
    try {
        const challenge: Challenge = await ChallengeService.find(challengeId);
        res.status(200).send(challenge);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// POST challenges/
challengesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const challenge: Challenge = req.body.challenge;
        const createdChallenge: any = await ChallengeService.create(challenge);
        res.status(201).send(createdChallenge);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT challenges/
challengesRouter.put("/", async (req: Request, res: Response) => {
    try {
        const challenge: Challenge = req.body.challenge;
        const updatedChallenge: any = await ChallengeService.update(challenge);
        res.status(200).send(updatedChallenge);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE challenges/:id
challengesRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const challengeId: number = parseInt(req.params.id, 10);
        await ChallengeService.remove(challengeId);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});