import express, { Request, Response } from "express";
import * as LoginService from "./login.service";
import { User } from "../users/user.interface";
import * as UserService from "../users/users.service";
import { createUserTeam, addUserToTheirTeam, Helper } from "../utils/helpers";

export const signupRouter = express.Router();


// POST login/
signupRouter.post("/", async (req: Request, res: Response) => {
    const user: User = req.body.user;
    try {
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
            res.status(201).send('User Created');
        };
    } catch (e) {
        res.status(404).send(e.message);
    }
    // const userInfo = req.body.user;
    // try {
    //     if (!userInfo.email || !userInfo.password) {
    //         return res.status(400).send({'message': 'Some values are missing'});
    //     }
    //     if (!Helper.isValidEmail(userInfo.email)) {
    //         return res.status(400).send({'message': 'Please enter a valid email address'});
    //     }
    //     const result = await LoginService.login(userInfo);
    //     const token = Helper.generateToken(result.id);
    //     return res.status(200).send({token});
    // } catch (e) {
    //     res.status(404).send(e.message);
    // }
});