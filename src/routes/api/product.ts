import express from 'express';
import * as ProductController from '../../controller/product_controller';
import {verifyAuthToken} from '../../middlewares/verifyAuthToken';

const router = express.Router();

router.get('/', ProductController.index);
router.get('/:id', ProductController.show);
router.post('/',verifyAuthToken, ProductController.create);
router.delete('/:id',verifyAuthToken, ProductController.remove);

export default router;