import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import authRoutes from './routes/auth.router.js';
import articleRoutes from './routes/article.router.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/articles', articleRoutes);
app.use('/users', userRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('MongoDB connected');
  app.listen(process.env.PORT || 5000, () => {
    console.log(`Server running on port ${process.env.PORT || 5000}`);
  });
}).catch(err => console.error(err));
