import express, { Request, Response } from "express";
import * as EventService from "./events.service";
import { Event } from "./event.interface";
import { Events } from "./events.interface";
import * as TeamService from "../teams/teams.service";
import { Team } from "../teams/team.interface";

export const eventsRouter = express.Router();


// // GET events/
// eventsRouter.get("/", async (req: Request, res: Response) => {
//     try {
//         const events: Events = await EventService.findAll();
//         res.status(200).send(events);
//     } catch (e) {
//         res.status(404).send(e.message);
//     }
// });

// // GET events/:id
// eventsRouter.get("/:id", async (req: Request, res: Response) => {
//     const eventId: number = parseInt(req.params.id, 10);
//     try {
//         const event: Event = await EventService.find(eventId);
//         res.status(200).send(event);
//     } catch (e) {
//         res.status(404).send(e.message);
//     }
// });

// GET events/city/:id
eventsRouter.get("/city/:id", async (req: Request, res: Response) => {
    const cityId: number = parseInt(req.params.id, 10);
    try {
        const events: Events = await EventService.findAllByCity(cityId);
        res.status(200).send(events);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST events/
eventsRouter.post("/", async (req: Request, res: Response) => {
    try {
        const event: Event = req.body.event;
        const eventTeams: any = req.body.eventTeams;
        const createdEvent: any = await EventService.create(event, eventTeams);
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
    const eventId: number = parseInt(req.params.id, 10);
    const userId: number = parseInt(req.body.userAuth.userId, 10);
    const eventInfo: any = await EventService.find(eventId);    
    const eventTeamCaptains: number[] = await Promise.all(eventInfo.eventTeams.map(async (event: any) => {
        const team: Team = await TeamService.find(event.team_id);
        return team.captain_id;
    })); 
    if (userId in eventTeamCaptains) {
        try {
            const deletedEvent = await EventService.remove(eventId);
            res.status(200).send(deletedEvent);
        } catch (e) {
            res.status(500).send(e.message);
        }
    } else {
        res.status(403).send("Could not delete event");
    }
});