import express, {
    Request,
    Response
} from "express";
import * as UserService from "./users.service";
import {
    User
} from "./user.interface";
import {
    Users
} from "./users.interface";

export const usersRouter = express.Router();


// GET users/
usersRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users: Users = await UserService.findAll();
        res.status(200).send(users);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET users/:id
usersRouter.get("/:id", async (req: Request, res: Response) => {
    const id: number = parseInt(req.params.id, 10);
    try {
        const user: User = await UserService.find(id);
        res.status(200).send(user);
    } catch (e) {
        res.status(404).send(e.message);
    }
});


// POST users/
usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user: User = req.body.user;
        await UserService.create(user);
        res.sendStatus(201);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT users/
usersRouter.put("/", async (req: Request, res: Response) => {
    try {
        const user: User = req.body.user;
        await UserService.update(user);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE users/:id
usersRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params.id, 10);
        await UserService.remove(id);
        res.sendStatus(200);
    } catch (e) {
        res.status(500).send(e.message);
    }
});