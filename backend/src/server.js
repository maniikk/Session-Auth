// ESM syntax is supported.
import express from 'express'
import mongoose from 'mongoose'
import connectStore from 'connect-mongo'
import session from 'express-session'
import {PORT, NODE_ENV, MONGO_URI, MONGO_URI_LOCAL, SESS_NAME, SESS_SECRET, SESS_LIFETIME} from './config'
import {userRouter, sessionRouter} from './routes'
import { sessionizeUser } from './utils/helper'
(async ()=> {
    try{
        await mongoose.connect(MONGO_URI_LOCAL,{useNewUrlParser:true, useUnifiedTopology: true})
        console.log('Database connected');
        const app = express()

        const MongoStore  = connectStore(session);
        const SessionStore = new MongoStore({
            mongooseConnection: mongoose.connection,
            collection: 'sessions',
            ttl: parseInt(SESS_LIFETIME)/1000
        });

        app.disable('x-powered-by');

        app.use(express.urlencoded({extended: true}))
        app.use(express.json())
        app.use(session({
            name: SESS_NAME,
            secret: SESS_SECRET,
            saveUninitialized: false,
            resave: false,
            store: SessionStore,
            cookie:{
                sameSite: true,
                secure: NODE_ENV === 'production',
                maxAge: parseInt(SESS_LIFETIME)
            }
        }));

        const apiRouter = express.Router()
        app.use('/api', apiRouter)
        apiRouter.use('/users', userRouter)
        apiRouter.use('/session', sessionRouter)
        app.listen(PORT, ()=> console.log(`Listening on port ${PORT}`))
    } catch(err) {
        console.log(err)
    }
})();
