import express from 'express';
import { protect, isAdmin } from '../middleware/auth.js';
import { promoteUserToAdmin, getAllUsers } from '../controllers/user.controller.js';

const router = express.Router();


router.put('/promote/:id', protect, isAdmin, promoteUserToAdmin);
router.get('/all', protect, isAdmin, getAllUsers);

export default router;
