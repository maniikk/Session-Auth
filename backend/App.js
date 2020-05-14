//Just a sample rundown of Express sessions as a learning exercise
const express = require('express')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoStore = require('connect-mongo')(session)

const app = express()
const MONGO_URI = 'mongodb+srv://maniikk:mongo@123@cluster0-he6wb.mongodb.net/test?retryWrites=true&w=majority'
const MongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
app.use(express.json())
app.use(express.urlencoded({extended: true}))
const connection = mongoose.createConnection(MONGO_URI, MongoOptions);

const SessionStore = new MongoStore({
    mongooseConnection: connection,
    collection: 'sessions'
});

app.use(session({
    secret: 'some secret',
    resave: false,
    saveUninitialized: true,
    store: SessionStore,
    cookie:{
        maxAge: 1000 * 30
    }
}));

app.get('/',(req,res)=>{
    if(req.session.viewCount) {
        req.session.viewCount ++;
    }
    else {
        req.session.viewCount = 1;
    }
    res.send(`<h1>You have viewed this page ${req.session.viewCount} times</h1>`)
})
app.listen(3005, ()=>{
    console.log('listening on port 3005')
});