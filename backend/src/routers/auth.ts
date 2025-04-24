import { Request,  Router } from "express";
import { authStatus, login, logout, register, reset2FA, setup2FA, verify2FA } from "../controllers/auth";
import { getUser } from "../middleware/getUser";

const router = Router();

router.post("/auth/register", register)

router.post("/auth/login", login)

router.get("/auth/status", getUser, authStatus)

router.post("/auth/status", logout)

router.get("/2fa/setup", getUser, setup2FA)

router.post("/2fa/reset", reset2FA)

export default router;