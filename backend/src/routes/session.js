import express from 'express'
import Joi from '@hapi/joi'
import User from '../models/user'
import {signIn} from '../validations/user'
import {SESS_NAME} from '../../config'
import {parseError, sessionizeUser} from '../utils/helper'
import { compareSync } from 'bcryptjs'

const sessionRouter = express.Router();
sessionRouter.post("",async (req,res)=> {
    try {
        const {email, password} = req.body
        await signIn.validateAsync({email, password})
        const user = await User.findOne({email});
        if (user && compareSync(password, user.password)) {
            const sessionUser = sessionizeUser(user);
            req.session.user = sessionUser;
            res.send(sessionUser);
        }
        else{
            throw new Error('Invalid Login Credentials')
        }
    } catch(err) {
        res.status(401).send(parseError(err))
    }
});

sessionRouter.delete("", ({session}, res) => {
    try{
        const user = session.user;
        if(user) {
            session.destroy(err => {
                if(err) throw err;
                res.clearCookie(SESS_NAME);
                res.send(user);
            })
        }
        else {
            throw new Error('Something went wrong');
        }
    } catch(err) {
        res.status(422).send(parseError(err));
    }
    
});

sessionRouter.get("", ({session: {user}}, res) => {
    if(user) {
        res.send({user});
    }
    else {
        res.status(204).send();
    }
});
export default sessionRouter;