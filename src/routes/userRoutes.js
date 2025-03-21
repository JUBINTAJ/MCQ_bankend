import express from 'express'
import { logout, regiseterUser, userLogin } from '../controllers/userController.js'
import { createValidator } from 'express-joi-validation'
import { loginvalidation, signupvalidation } from '../validation/userValidation.js'

const  router= express.Router()
const validator=createValidator({passError:true})

router.post('/signup',validator.body(signupvalidation),regiseterUser)
router.post('/login',validator.body(loginvalidation),userLogin)
router.post('/logout',logout)




export default router 