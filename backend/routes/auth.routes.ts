import express, { Express, Request, Response, Application } from 'express';
import { CAuth } from '../controllers';

const router = express.Router();

router.post("/signup", CAuth.signup);

router.post("/login", CAuth.login);

router.post("/logout", CAuth.logout);

export default router;