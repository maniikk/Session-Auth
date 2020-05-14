import express from 'express'
import Joi from '@hapi/joi'
import User from '../models/user'
import {signUp} from '../validations/user'
import {sessionizeUser, parseError} from '../utils/helper'
const userRouter = express.Router()
userRouter.post("", async (req,res)=>{
    try{
        const {username, email, password} = req.body;
        await signUp.validateAsync({ username, email, password });
        const newUser = new User({username, email, password});
        const sessionUser = sessionizeUser(newUser);
        await newUser.save();

        req.session.user = sessionUser;
        res.send({sessionUser});
    } catch(err) {
        res.status(400).send(parseError(err));
    }
    
});
export default userRouter