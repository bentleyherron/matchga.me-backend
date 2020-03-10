import express, { Request, Response } from "express";
import * as LoginService from "./login.service";
import { Helper } from "../utils/helpers";

export const loginRouter = express.Router();


// POST login/
loginRouter.post("/", async (req: Request, res: Response) => {
    const userInfo = req.body.user;
    try {
        if (!userInfo.email || !userInfo.password) {
            return res.status(400).send({'message': 'Some values are missing'});
        }
        if (!Helper.isValidEmail(userInfo.email)) {
            return res.status(400).send({'message': 'Please enter a valid email address'});
        }
        const result = await LoginService.login(userInfo);
        if (!result) {
            return res.status(400).send({'message': 'The credentials you provided are incorrect'});
        }
        if (!Helper.comparePassword(result.password, userInfo.password)) {
            return res.status(400).send({'message': 'The credentials you provided are incorrect'});
        }
        const token = Helper.generateToken(result.id);
        return res.status(200).send({token});
    } catch (e) {
        res.status(404).send(e.message);
    }
});