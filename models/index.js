import mongoose from 'mongoose';
import { LoggerService } from '../services/index.js';
import CONFIG from '../config.js';
import CacheModel from './cache.js';


mongoose.set('useFindAndModify', false);
mongoose.set('useNewUrlParser', true);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('debug', CONFIG.MONGO.DEBUG);
mongoose.connect(CONFIG.MONGO.URI)
  .then(() => {
    LoggerService.info({ message: 'MAIN DB CONNECTION SUCCESSFUL', data: {} });
  })
  .catch((err) => {
    LoggerService.error({ message: 'MAIN DB CONNECTION ERROR', data: { err }});
  });

export {
  CacheModel,
}

export default {
  CacheModel,
}