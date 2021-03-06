import { isNullOrUndefined } from 'util';
import moment from 'moment';

import { LoggerService } from './index.js';
import { CacheModel } from '../models/index.js';
import CONFIG from '../config.js';

const getRandomString = () => {
  const hexadecimalLetters = [
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
    'a', 'b', 'c', 'd', 'e', 'f',
  ];
  let randomString = '';
  for (let i = 0; i < CONFIG.CACHE.RANDOM_STRING_LENGTH; i++) {
    randomString += hexadecimalLetters[Math.floor(Math.random() * 16)]
  }
  return randomString;
}

const upsertDataByKey = ({ key, data }) => {
  const ttlDurationAsSeconds = CONFIG.CACHE.TTL.DURATION_AS_SECONDS
  const timeToExpire = new Date(moment().add(ttlDurationAsSeconds, 'seconds'))

  const match = { key };
  const update = {
    key,
    data,
    ttlDurationAsSeconds,
    timeToExpire,
  };
  const options = {
    new: true,
    upsert: true,
  };
  return CacheModel.countDocuments({})
    .then((count) => {
      // TODO what if the count is way bigger than number of entries allowed?
      if (count < CONFIG.CACHE.NUMBER_OF_ENTRIES_ALLOWED) {
        return CacheModel.findOneAndUpdate(match, update, options).maxTime(CONFIG.MONGO.MAX_TIME_FOR_QUERY_AS_MS).lean();
      }
      return CacheModel.findOne(match).lean()
        .then((resultFromDB) => {
          if (resultFromDB) {
            return CacheModel.findOneAndUpdate(match, update, options).maxTime(CONFIG.MONGO.MAX_TIME_FOR_QUERY_AS_MS).lean();
          }
          return CacheModel.find({}).sort({ timeToExpire: 1 }).limit(1).maxTime(CONFIG.MONGO.MAX_TIME_FOR_QUERY_AS_MS)
            .then((dataToDelete) => {
              if (Array.isArray(dataToDelete) && dataToDelete[0] && dataToDelete[0]._id) {
                return CacheModel.findByIdAndDelete(dataToDelete[0]._id);
              }
              return Promise.resolve();
            })
            .then(() => {
              return CacheModel.findOneAndUpdate(match, update, options).maxTime(CONFIG.MONGO.MAX_TIME_FOR_QUERY_AS_MS).lean();
            });
        });
    });
};

const getDataByKey = ({ key }) => {
  const now = moment();
  return CacheModel.findOne({ key }).maxTime(CONFIG.MONGO.MAX_TIME_FOR_QUERY_AS_MS)
    .then((resultFromDB) => {
      if (isNullOrUndefined(resultFromDB)) {
        LoggerService.info({ message: 'Cache Miss', data: { key }});
        const newRandomString = getRandomString();
        return upsertDataByKey({ key, data: newRandomString });
      }
      else if (moment(resultFromDB.timeToExpire).isBefore(now)) {
        LoggerService.info({ message: 'Cache Hit But Expired', data: { key }});
        const newRandomString = getRandomString();
        return upsertDataByKey({ key, data: newRandomString });
      }
      LoggerService.info({ message: 'Cache Hit', data: { key }});
      return upsertDataByKey({ key, data: resultFromDB.data })
    });
};

const getAllData = ({}) => {
  return CacheModel.find({}).maxTime(CONFIG.MONGO.MAX_TIME_FOR_QUERY_AS_MS).lean();
};

const removeDataByKey = ({ key }) => {
  return CacheModel.findOneAndDelete({ key }).maxTime(CONFIG.MONGO.MAX_TIME_FOR_QUERY_AS_MS).lean();
}

const removeAllData = ({}) => {
  return CacheModel.deleteMany({}).maxTime(CONFIG.MONGO.MAX_TIME_FOR_QUERY_AS_MS).lean();
}

export {
  getDataByKey,
  getAllData,
  upsertDataByKey,
  removeDataByKey,
  removeAllData,
};

export default {
  getDataByKey,
  getAllData,
  upsertDataByKey,
  removeDataByKey,
  removeAllData,
};
