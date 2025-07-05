import express from 'express';
import { protect, authorize } from '../middleware/auth';
import { getUsers, getUser, updateUser, deleteUser } from '../controllers/userController';

const router = express.Router();

// All routes require authentication and admin role
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getUsers);

router.route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router; 