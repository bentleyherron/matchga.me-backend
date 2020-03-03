import express, { Request, Response } from "express";
import * as EventService from "./events.service";
import { Event } from "./event.interface";
import { Events } from "./events.interface";

export const eventsRouter = express.Router();


// GET events/
eventsRouter.get("/", async (req: Request, res: Response) => {
    try {
        const events: Events = await EventService.findAll();
        res.status(200).send(events);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET events/:id
eventsRouter.get("/:id", async (req: Request, res: Response) => {
    const event_id: number = parseInt(req.params.id, 10);
    try {
        const event: Event = await EventService.find(event_id);
        res.status(200).send(event);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// POST events/
eventsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const event: Event = req.body.event;
        await EventService.create(event);
        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT events/
eventsRouter.put("/", async (req: Request, res: Response) => {
    try {
        const event: Event = req.body.event;
        await EventService.update(event);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE events/:id
eventsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const event_id: number = parseInt(req.params.id, 10);
        await EventService.remove(event_id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});