import { Request, Response } from 'express'
import { Order, OrderStore } from '../models/order'

const orderStore = new OrderStore()

const index = async (_req: Request, res: Response) => {
    try {
        const orders = await orderStore.index()
        res.json(orders)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const show = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.show(req.params.id)
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const create = async (req: Request, res: Response) => {
    try {
        const order: Order = {
            user_id: req.body.user_id,
            status: req.body.status,
        }
        const newOrder = await orderStore.create(order)
        res.json(newOrder)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const remove = async (req: Request, res: Response) => {
    try {
        const user = await orderStore.delete(req.params.id)
        res.json(user)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const addProduct = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.addProduct(req.params.order_id, req.params.product_id)
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

const showProducts = async (req: Request, res: Response) => {
    try {
        const order = await orderStore.showProducts(req.params.id)
        res.json(order)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
}

export { index, show, create, remove, addProduct , showProducts}
