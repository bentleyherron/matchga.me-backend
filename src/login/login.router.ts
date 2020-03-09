import { Request, Response, NextFunction } from "express";
import { Helper } from "../utils/helpers";
import { db } from '../db/connect';


export const login = async (req: Request, res: Response) => {
    if (!req.body.user.email || !req.body.user.password) {
        return res.status(400).send({
            'message': 'Some values are missing'
        });
    }
    if (!Helper.isValidEmail(req.body.user.email)) {
        return res.status(400).send({
            'message': 'Please enter a valid email address'
        });
    }
    const text = 'SELECT * FROM users WHERE LOWER(email) = $1';
    try {
        const email = req.body.user.email.toLowerCase();
        const result = await db.one(text, [email]);
        if (!result) {
            return res.status(400).send({
                'message': 'The credentials you provided is incorrect'
            });
        }
        if (!Helper.comparePassword(result.password, req.body.user.password)) {
            return res.status(400).send({
                'message': 'The credentials you provided is incorrect'
            });
        }
        const token = Helper.generateToken(result.id);
        return res.status(200).send({
            token
        });
    } catch (error) {
        return res.status(400).send(error)
    }
};