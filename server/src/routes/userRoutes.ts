import { Router } from "express";
import { login, register } from "../controllers/userController";

const router = Router();

router.post('/register', register as any);
router.get('/login', login as any);