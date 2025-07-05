import { Request, Response } from 'express';
import Portfolio from '../models/Portfolio';

// @desc    Get all portfolio items
// @route   GET /api/portfolio
// @access  Public
export const getPortfolioItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category, featured } = req.query;
    
    let query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured !== undefined) {
      query.featured = featured === 'true';
    }
    
    const portfolioItems = await Portfolio.find(query).sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: portfolioItems.length,
      data: portfolioItems
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Get single portfolio item
// @route   GET /api/portfolio/:id
// @access  Public
export const getPortfolioItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);
    
    if (!portfolioItem) {
      res.status(404).json({
        success: false,
        error: 'Portfolio item not found'
      });
      return;
    }
    
    res.json({
      success: true,
      data: portfolioItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Create portfolio item
// @route   POST /api/portfolio
// @access  Private/Admin
export const createPortfolioItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolioItem = await Portfolio.create(req.body);
    
    res.status(201).json({
      success: true,
      data: portfolioItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Update portfolio item
// @route   PUT /api/portfolio/:id
// @access  Private/Admin
export const updatePortfolioItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolioItem = await Portfolio.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!portfolioItem) {
      res.status(404).json({
        success: false,
        error: 'Portfolio item not found'
      });
      return;
    }
    
    res.json({
      success: true,
      data: portfolioItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
};

// @desc    Delete portfolio item
// @route   DELETE /api/portfolio/:id
// @access  Private/Admin
export const deletePortfolioItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const portfolioItem = await Portfolio.findById(req.params.id);
    
    if (!portfolioItem) {
      res.status(404).json({
        success: false,
        error: 'Portfolio item not found'
      });
      return;
    }
    
    await portfolioItem.deleteOne();
    
    res.json({
      success: true,
      message: 'Portfolio item deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
}; 