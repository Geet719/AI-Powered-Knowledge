import Article from '../models/article.model.js';
import { summarizeWithGemini } from '../utils/gemini.js';


export const createArticle = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const newArticle = await Article.create({
      title,
      content,
      tags,
      createdBy: req.user.id,
    });

    res.status(201).json(newArticle);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to create article', error: err.message });
  }
};

// 
export const getAllArticles = async (req, res) => {
  try {
    const articles = await Article.find().populate('createdBy', 'name email');
    res.status(200).json(articles);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch articles', error: err.message });
  }
};


export const getSingleArticle = async (req, res) => {
  // console.log(`Fetching article with ID: ${req.params.id}`);
  try {
    const article = await Article.findById(req.params.id).populate('createdBy', 'name email');
    if (!article) return res.status(404).json({ msg: 'Article not found' });

    res.status(200).json(article);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to fetch article', error: err.message });
  }
};


export const updateArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) return res.status(404).json({ msg: 'Article not found' });

    // Check if current user is the creator
    if (article.createdBy.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Not authorized to update this article' });
    }

    const { title, content, tags } = req.body;

    article.title = title || article.title;
    article.content = content || article.content;
    article.tags = tags || article.tags;

    const updated = await article.save();
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ msg: 'Failed to update article', error: err.message });
  }
};



export const summarizeArticle = async (req, res) => {
  
  console.log(`Summarizing article with ID: ${req.params.id}`);
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ msg: 'Article not found' });
    
    const summary = await summarizeWithGemini(article.content);
    article.summary = summary;
    await article.save();

    res.status(200).json({ summary });
  } catch (err) {
    
    res.status(500).json({ msg: 'Summarization failed', error: err.message });
  }
};

export const deleteArticle = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    await article.deleteOne();
    res.status(200).json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
