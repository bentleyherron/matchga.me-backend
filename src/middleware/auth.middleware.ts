import jwt from 'jsonwebtoken';
import { db } from '../db/connect';
import { Request, Response, NextFunction } from "express";

export const Auth = {
  async verifyToken(req: Request, res: Response, next: NextFunction) {
    const token: any = req.headers['x-access-token'];
    const secret: any = process.env.JWT_SECRET;
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded: any = await jwt.verify(token, secret);
      const text = 'SELECT * FROM users WHERE id = $1';
      const result = await db.one(text, [decoded.userId]);
      if(!result) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.body.userAuth = { userId: decoded.userId };
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  }
};