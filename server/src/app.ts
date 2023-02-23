import connectDB from '@/utils/connectDB';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';

export default async function App() {
    const app = express();

    app.use(morgan('dev'));
    app.use(cors());
    app.use(helmet());
    app.use(express.urlencoded({ extended: true, limit: '50mb' }));
    app.use(express.json({ limit: '50mb' }));
    app.use(compression());

    await connectDB();

    app.listen(Number(process.env.PORT), () => {
        console.log(`App runnning on port ${process.env.PORT}`);
    });

    routes(app);
}
