import express, { Request, Response } from "express";
import * as UserService from "./users.service";
import { User } from "./user.interface";
import { Users } from "./users.interface";

import { createUserTeam, addUserToTheirTeam, Helper } from "../utils/helpers";

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
usersRouter.get("/me", async (req: Request, res: Response) => {
    // const userId: number = parseInt(req.params.id, 10);
    const userId: number = parseInt(req.body.userAuth.userId, 10);
    try {
        const user: User = await UserService.find(userId);
        res.status(200).send(user);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// GET users/city/:id
usersRouter.get("/city/:id", async (req: Request, res: Response) => {
    const cityId: number = parseInt(req.params.id, 10);
    try {
        const users: Users = await UserService.findAllByCity(cityId);
        res.status(200).send(users);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST users/check
usersRouter.post("/check", async (req: Request, res: Response) => {
    try {
        const user: User = req.body.user;
        const userExistsInfo: any = await UserService.checkUser(user);
        res.status(200).send(userExistsInfo);
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// POST users/
usersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user: User = req.body.user;
        if (!user.email || !user.password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!Helper.isValidEmail(user.email)) {
            return res.status(400).send({ 'message': 'Please enter a valid email address' });
        }
        const userCreated: any = await UserService.create(user);
        if (userCreated) {
            const teamCreated: object = await createUserTeam(userCreated);
            const teamLinked: object = await addUserToTheirTeam(userCreated, teamCreated)
            res.status(201).send(userCreated.token);
        };
    } catch (e) {
        res.status(404).send(e.message);
    }
});

// PUT users/
usersRouter.put("/", async (req: Request, res: Response) => {
    try {
        const user: User = req.body.user;
        const updatedUser: any = await UserService.update(user);
        res.status(200).send(updatedUser);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

// DELETE users/:id
usersRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const userId: number = parseInt(req.params.id, 10);
        const deletedUser = await UserService.remove(userId);
        res.status(200).send(deletedUser);
    } catch (e) {
        res.status(500).send(e.message);
    }
});