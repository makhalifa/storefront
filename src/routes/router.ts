import { Application } from 'express';
import UserRouter from './api/user';
import ProductRouter from './api/product';
import OrderRouter from './api/order';

export const Router = (app:Application) =>{
    app.use('/users', UserRouter)
    app.use('/products', ProductRouter)
    app.use('/orders', OrderRouter)
}