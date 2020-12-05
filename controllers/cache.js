import { isNullOrUndefined } from 'util';
import { CacheService } from '../services/index.js';
import {
  createController,
  CustomError,
} from './util.js';
import {
  isValidStringInput,
} from '../shared/util.js';

import MESSAGES from '../shared/messages.js';

const getDataByKey = createController((req) => {
  const { key } = req.params;

  if (isNullOrUndefined(key)) {
    throw new CustomError(MESSAGES.VALIDATION_MESSAGES.MISSING_REQUIRED_PARAMS);
  }
  if (!isValidStringInput(key)) {
    throw new CustomError(MESSAGES.VALIDATION_MESSAGES.INVALID_PARAMS);
  }

  return CacheService.getDataByKey({ key });
});

const getAllData = createController((req) => {
  return CacheService.getAllData({});
});

export {
  getDataByKey,
  getAllData,
};

export default {
  getDataByKey,
  getAllData,
};
