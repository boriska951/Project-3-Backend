const express = require('express');

const routes = require('./routes');

const cors = require('cors')

const session = require('express-session')

const PORT = process.env.PORT || 3003;

const app = express();

const MongoDBStore = require('connect-mongodb-session')(session)

require('./config/db');

const whitelist = ['http://localhost:3000','https://bromeliad-boutique.herokuapp.com']
const corsOptions = {
  origin: (origin, callback) => {
    if(whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions))

app.set('trust proxy', 1)

app.use(session({
    secret: "asdffjk",
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
      uri: process.env.MONGODBURI,
      collection: 'mySessions'
    }),
    cookie: {
      sameSite: 'none',
      secure: true
    }
  }))

app.use(express.json());


app.use('/', routes.homepage)

app.use('/users', routes.users)


app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT} 🎉🎊`);
});