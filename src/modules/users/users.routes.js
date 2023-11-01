import { Router } from "express";
import { deleteUser, login, signup, updateUser } from "./users.controller.js";
import { validateExistUser } from "./users.middleware.js";

export const router = Router()

router.post('/signup', signup)
router.post('/login', login)
// router.get('/orders', findOrders)

// router.get('/orders/:id', findOneOrder)
router.patch('/:id', validateExistUser, updateUser)
router.delete('/:id', validateExistUser, deleteUser)