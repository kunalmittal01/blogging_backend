import express from 'express';
import 'dotenv/config';
import mongoose from 'mongoose';
import userRouter from './routes/user.js';
import authRouter from './routes/auth.js';
import blogRouter from './routes/blogs.js';
import cors from 'cors';
import commentsRouter from './routes/comments.js';
import cookieParser from 'cookie-parser';
const app = express();

await mongoose.connect(process.env.mongo_url);

app.use(cookieParser());

app.use(cors({

    credentials: true,
    allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());
app.use(express.urlencoded());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/blogs', blogRouter);
app.use('/api/v1/comments', commentsRouter);

app.use('*', (req, res) => {
    res.status(404).json({ message: "Invalid route" }); 
})
app.listen(process.env.port, () => {
    console.log(`Server is running at http://localhost:${process.env.port}`);
})