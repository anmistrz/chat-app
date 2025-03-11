import express, { Application } from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import routes from './routes';
import { connectDB } from './lib/db';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/', routes);


app.listen(port, () => {
  console.log(`Server is Fire at https://localhost:${port}`);
  connectDB();
});