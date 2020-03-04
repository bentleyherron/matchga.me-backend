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
    const eventId: number = parseInt(req.params.id, 10);
    try {
        const event: Event = await EventService.find(eventId);
        res.status(200).send(event);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// POST events/
eventsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const event: Event = req.body.event;
        const createdEvent: any = await EventService.create(event);
        res.status(201).send(createdEvent);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT events/
eventsRouter.put("/", async (req: Request, res: Response) => {
    try {
        const event: Event = req.body.event;
        const updatedEvent: any = await EventService.update(event);
        res.status(200).send(updatedEvent);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE events/:id
eventsRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const eventId: number = parseInt(req.params.id, 10);
        await EventService.remove(eventId);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});