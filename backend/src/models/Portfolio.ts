import mongoose, { Document, Schema } from 'mongoose';

export interface IPortfolio extends Document {
  title: string;
  description: string;
  image: string;
  video?: string;
  category: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const portfolioSchema = new Schema<IPortfolio>({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please provide a description'],
    maxlength: [1000, 'Description cannot be more than 1000 characters']
  },
  image: {
    type: String,
    required: [true, 'Please provide an image URL']
  },
  video: {
    type: String
  },
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['web', 'mobile', 'design', 'other']
  },
  technologies: [{
    type: String,
    required: [true, 'Please provide at least one technology']
  }],
  liveUrl: {
    type: String
  },
  githubUrl: {
    type: String
  },
  featured: {
    type: Boolean,
    default: false
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Index for better query performance
portfolioSchema.index({ category: 1, featured: 1, order: 1 });

export default mongoose.model<IPortfolio>('Portfolio', portfolioSchema); 