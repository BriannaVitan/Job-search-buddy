import { Router } from 'express';
import { userRouter } from './user-routes.js';
import { postingRouter } from './postings-routes.js';
import { affirmRouter } from './affirm-routes.js';

const router = Router();
router.use('/postings', postingRouter);
router.use('/users', userRouter);
router.use('/affirm', affirmRouter);
export default router;
