import Joi from "joi"

export const signupvalidation = Joi.object({
    username :Joi.string().required().min(2).max(10),
    email:Joi.string().required().email(),
    phoneNumber:Joi.string().required().max(10),
    password:Joi.string().required().min(8),
    status: Joi.string().valid('student', 'employee').optional()

})

export const  loginvalidation=Joi.object({
    phoneNumber : Joi.string().required().max(10),
    password:Joi.string().required().min(8)
})