import express from 'express';
import { deleteArticle, summarizeArticle } from '../controllers/article.controller.js';
import {
  createArticle,
  getAllArticles,
  getSingleArticle,
  updateArticle
} from '../controllers/article.controller.js';

import { isAdmin, protect } from '../middleware/auth.js';

const router = express.Router();

// Protected Routes
router.post('/', protect, createArticle);         // Create article
router.get('/', protect, getAllArticles);         // Get all articles
router.get('/:id', protect, getSingleArticle);    // Get single article
router.put('/:id', protect, updateArticle);       // Update article
router.post('/:id/summarize', protect, summarizeArticle);
router.delete('/:id', protect, isAdmin, deleteArticle);


export default router;


