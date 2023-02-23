import mongoose from 'mongoose';

export default async function connectDB() {
    const { DB_USER, DB_PASSWORD, DB_PATH } = process.env;
    try {
        mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PASSWORD}${DB_PATH}`);
        console.log('Connected to DB');
    } catch (e) {
        console.log(e);
    }
}
