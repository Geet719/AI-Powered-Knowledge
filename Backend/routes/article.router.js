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


router.post('/', protect, createArticle);        
router.get('/', protect, getAllArticles);         
router.get('/:id', protect, getSingleArticle);    
router.put('/:id', protect, updateArticle);       
router.post('/:id/summarize', protect, summarizeArticle);
router.delete('/:id', protect, isAdmin, deleteArticle);


export default router;


