import express from 'express';
import passport from 'passport';
import handlebars from 'express-handlebars';
import config from './config/config.js';
import { __dirname } from './utils/utils.js';
import { init as initSocket } from './socket.js';
import MessageServices from './services/messages-services.js';
import './database/database.js';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import mainRouter from './routers/main-routers.js';
import './lib/jwt/jwt.js';
import { developmentLogger } from './utils/loggers.js';
import { connectionString } from './database/database.js';
//import { errorHandler } from './lib/middlewares/errorHandler.js';

const storeOptions = {
  store: MongoStore.create({
    mongoUrl: connectionString,
    crypto: {
      secret: config.SECRET_KEY,
    },
    ttl: 60000,
  }),
};

const sessionConfig = {
  secret: config.SECRET_KEY,
  saveUninitialized: false,
  resave: false,
};

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');
app.use(passport.initialize());
app.use(cookieParser());
//app.use(errorHandler);
app.use(session({ ...sessionConfig, ...storeOptions }));
app.use('/api', mainRouter);

const ENV = config.ENV;
const PORT = config.PORT;

const httpServer = app.listen(PORT, () => {
  if (ENV === 'DEV') {
    developmentLogger.info(`Server is running on port ${PORT}`);
  }
});

// CHAT WITH SOCKETS

const socketServer = initSocket(httpServer);
const messageServices = new MessageServices();

socketServer.on('connection', (socket) => {
  socket.on('disconnect', () => {
    console.log('user logged out');
  });
  socket.on('newUser', (user) => {
    console.log(`user ${user} is logged in`);
  });
  socket.on('chat:message', async (message) => {
    await messageServices.create(message);
    socketServer.emit('messages', await messageServices.getAll());
  });
});
