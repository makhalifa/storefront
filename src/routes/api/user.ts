import express from 'express';
import * as UserController from '../../controller/user_controller';

const router = express.Router();

router.get('/', UserController.index);
router.get('/:id', UserController.show);
router.post('/', UserController.create);
router.delete('/:id', UserController.remove);
router.post('/authenticate', UserController.authenticate);

export default router;