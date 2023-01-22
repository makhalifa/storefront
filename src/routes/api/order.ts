import express from 'express';
import * as OrderHandler from '../../controller/order_controller';
import {verifyAuthToken} from '../../middlewares/verifyAuthToken';

const router = express.Router();

router.get('/', OrderHandler.index);
router.get('/:id', OrderHandler.show);
router.post('/',verifyAuthToken, OrderHandler.create);
router.delete('/:id',verifyAuthToken, OrderHandler.remove);
router.get('/:id/products',verifyAuthToken, OrderHandler.showProducts);
router.post('/:id/products',verifyAuthToken, OrderHandler.addProduct);

export default router;