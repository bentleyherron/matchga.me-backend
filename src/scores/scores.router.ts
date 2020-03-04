import express, { Request, Response } from "express";
import * as ScoreService from "./scores.service";
import { Score } from "./score.interface";
import { Scores } from "./scores.interface";


export const scoresRouter = express.Router();


// GET scores/
scoresRouter.get("/", async (req: Request, res: Response) => {
    try {
        const scores: Scores = await ScoreService.findAll();
        res.status(200).send(scores);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET scores/:id (Gets all scores for a team)
scoresRouter.get("/:id", async (req: Request, res: Response) => {
    const teamId: number = parseInt(req.params.id, 10);
    try {
        const scores: Scores = await ScoreService.findAllTeamScores(teamId);
        res.status(200).send(scores);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST scores/
scoresRouter.post("/", async (req: Request, res: Response) => {
    try {
        const scoreInfo: Score = req.body.score;
        const createdScore: any = await ScoreService.create(scoreInfo);
        res.status(201).send(createdScore);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT scores/
scoresRouter.put("/", async (req: Request, res: Response) => {
    try {
        const score: Score = req.body.score;
        const updatedScore: any = await ScoreService.update(score);
        res.status(200).send(updatedScore);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE score/ (Takes event_id and team_id)
scoresRouter.delete("/", async (req: Request, res: Response) => {
    try {
        const deleteScore: Score = req.body.score;
        const deletedScore = await ScoreService.remove(deleteScore);
        res.status(200).send(deletedScore);
    } catch (e) {
        res.status(500).send(e.message);
    }
});