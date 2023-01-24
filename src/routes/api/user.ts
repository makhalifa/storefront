import express from 'express';
import * as UserController from '../../controller/user_controller';
import { verifyAuthToken } from './../../middlewares/verifyAuthToken';

const router = express.Router();

router.get('/',verifyAuthToken, UserController.index);
router.get('/:id',verifyAuthToken, UserController.show);
router.post('/', UserController.create);
router.delete('/:id',verifyAuthToken, UserController.remove);
router.post('/authenticate', UserController.authenticate);

export default router;