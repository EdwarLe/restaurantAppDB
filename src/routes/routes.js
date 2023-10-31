import { Router } from "express";
import { router as routeUsers } from "../users/users.routes.js";

export const router = Router()

router.use('/users', routeUsers)