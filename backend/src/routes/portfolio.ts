import express from 'express';
import { protect, authorize } from '../middleware/auth';
import { 
  getPortfolioItems, 
  getPortfolioItem, 
  createPortfolioItem, 
  updatePortfolioItem, 
  deletePortfolioItem 
} from '../controllers/portfolioController';

const router = express.Router();

// Public routes
router.route('/')
  .get(getPortfolioItems);

router.route('/:id')
  .get(getPortfolioItem);

// Protected routes (admin only)
router.use(protect);
router.use(authorize('admin'));

router.route('/')
  .post(createPortfolioItem);

router.route('/:id')
  .put(updatePortfolioItem)
  .delete(deletePortfolioItem);

export default router; 