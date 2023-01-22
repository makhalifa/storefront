import { Request, Response } from 'express';
import { Product, ProductStore } from '../models/product';

const productStore = new ProductStore();

const index = async (_req: Request, res: Response) => {
    try {
        const products = await productStore.index();
        res.json(products);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const show = async (req: Request, res: Response) => {
    try {
        const product = await productStore.show(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
};

const create = async (req: Request, res: Response) => {
    try {
        const product: Product = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category
        };
        const newProduct = await productStore.create(product);
        res.json(newProduct);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const product = await productStore.delete(req.params.id);
        res.json(product);
    } catch (err) {
        res.status(400);
        res.json(err);
    }
}

export { index, show, create, remove };