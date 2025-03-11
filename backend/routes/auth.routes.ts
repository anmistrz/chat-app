import express from 'express';
import { CAuth } from '../controllers';
import AuthMiddleware from '../middleware/auth.middleware';
import protectRoute from '../middleware/auth.middleware';

const router = express.Router();

router.post("/signup", CAuth.signup);

router.post("/login", CAuth.login);

router.post("/logout", CAuth.logout);

// router.put("/update-profile", AuthMiddleware.protectRoute, CAuth.updateProfile);

router.get("/check", protectRoute, CAuth.authCheck);


export default router;