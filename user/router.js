import { Router } from 'express'
import { userController } from '../controller'

export const userRouter = new Router()

userRouter.post('/register', userController.registerUser)
userRouter.post('/auth', userController.authUser)
userRouter.put('/restore-password', userController.restorePassword)