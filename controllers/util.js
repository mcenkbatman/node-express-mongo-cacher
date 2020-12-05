import BB from 'bluebird';
import { isNullOrUndefined } from 'util';
import MESSAGES from '../shared/messages.js';
import { LoggerService } from '../services/index.js';

class CustomError extends Error {
  constructor(message, statusCode, data) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode || 400;
    this.data = data || {};
  }
}

const getCustomError = (err) => {
  if (Array.isArray(err)) {
    return err.map(e => getCustomError(e, language));
  }

  if (isNullOrUndefined(err)) {
    err = new CustomError(MESSAGES.ERROR_MESSAGES.UNKNOWN, 400, {});
  }

  if (err instanceof CustomError) {
    return {
      statusCode: err.statusCode,
      message: err.message,
      data: err.data,
    };
  }

  LoggerService.error({ message: 'Unexpected ERROR', data: { error: err.stack }})
  return getCustomError(new CustomError(MESSAGES.ERROR_MESSAGES.UNKNOWN, 400, { error: err.stack }));
};

const sendResponse = (result, request, response) => {
  return response.status(200).send(result);
};

const catchError = (error, request, response) => {
  const { statusCode, message, data } = getCustomError(error);
  return response.status(statusCode).send({ message, data });
};

const createController = controllerFunc => (req, res, next) => (
  BB.resolve()
    .then(() => controllerFunc(req))
    .then(result => sendResponse(result, req, res))
    .catch(error => catchError(error, req, res))
    .finally(next)
);

export {
  createController,
  CustomError,
}

export default {
  createController,
  CustomError,
}