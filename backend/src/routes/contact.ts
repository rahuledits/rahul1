import express from 'express';
import { protect, authorize } from '../middleware/auth';
import { 
  createContact, 
  getContacts, 
  getContact, 
  updateContactStatus 
} from '../controllers/contactController';

const router = express.Router();

// Public route
router.route('/')
  .post(createContact);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .get(getContacts);

router.route('/:id')
  .get(getContact)
  .put(updateContactStatus);

export default router; 