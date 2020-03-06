import express, { Request, Response } from "express";
import * as StateService from "./states.service";
import { States } from "./states.interface";
import { Cities } from "./cities.interface";
import { City } from "./city.interface";

export const statesRouter = express.Router();


// GET all states
statesRouter.get("/", async (req: Request, res: Response) => {
    try {
        const states: States = await StateService.getAllStates();
        res.status(200).send(states);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET cities from in a state
statesRouter.get("/:id", async (req: Request, res: Response) => {
    const stateId: number = parseInt(req.params.id, 10);
    try {
        const cities: Cities = await StateService.getAllCitiesFromState(stateId);
        res.status(200).send(cities);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET city information
statesRouter.get("/city/:id", async (req: Request, res: Response) => {
    const cityId: number = parseInt(req.params.id, 10);
    try {
        const city: City = await StateService.getCityInfo(cityId);
        res.status(200).send(city);
    } catch (e) {
        res.status(404).send(e.message);
    }
});