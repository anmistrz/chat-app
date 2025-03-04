import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URI ?? '');
        console.log(`MongoDB Connected: ${connect.connection.host}`);
    } catch (error) {
        console.log(`MongoDB Connection Error: ${error}`);
        process.exit(1);
    }
};