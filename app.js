require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const methodOverride = require('method-override');
const MainRouter = require('./server/routes/main');
const AdminRouter = require('./server/routes/admin');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('express-flash');
const path = require('path');
const connectDB = require('./server/config/db');
const { isActiveRoute } = require('./server/helpers/routeHelpers.js');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 5000;

// connect to DB
connectDB();

// parse req with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

// creating session cookie
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Encryption key
    saveUninitialized: false, // session saving behavior
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 24 hours
      httpOnly: true,
    },
  })
);

app.use(flash());
app.use(express.static('public'));

// Templating engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');

app.locals.isActiveRoute = isActiveRoute;

app.use((req, res, next) => {
  res.locals.currentRoute = req.path;
  next();
});

app.use('/', MainRouter);
app.use('/', AdminRouter);

app.use(express.static(path.join(__dirname + '../public')));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
