import { Request, Response } from "express";
import { User, UserStore } from "../models/user";
import jwt from "jsonwebtoken";

const store = new UserStore();

const index = async (_req: Request, res: Response) => {
    try {
        const users = await store.index();
        res.json(users);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};
    
const show = async (req: Request, res: Response) => {
    try {
        const user = await store.show(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const user: User = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password
        };
        const newUser = await store.create(user);
        const token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const user = await store.delete(req.params.id);
        res.json(user);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const authenticate = async (req: Request, res: Response) => {
    try {
        const user = await store.authenticate(req.body.firstname, req.body.password);
        if (user===null) {
            res.status(401);
            res.json("Authentication failed");
            return;
        }
        const token = jwt.sign({ user }, process.env.TOKEN_SECRET as string);
        res.json(token);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export { index, show, create, remove, authenticate };
