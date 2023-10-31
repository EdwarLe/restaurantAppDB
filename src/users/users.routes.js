import { Router } from "express";
import { login, signup } from "./users.controller.js";

export const router = Router()

router.post('/signup', signup)
router.post('/login', login)
// router.get('/orders', findOrders)

// router.get('/orders/:id', findOneOrder)
// router.patch('/:id', updateUser)
// router.delete('/:id', deleteUser)