import connectDB from '@/utils/connectDB';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';

export default async function App() {
    const app = express();

    app.use(morgan('dev'));
    app.use(cors());
    app.use(helmet());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(compression());

    await connectDB();

    app.listen(Number(process.env.PORT), () => {
        console.log(`App runnning on port ${process.env.PORT}`);
    });
}
