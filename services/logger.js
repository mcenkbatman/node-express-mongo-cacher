const info = ({ message = '', data = {}}) => {
  console.info(`INFO MESSAGE: ${message} \nDATA: ${JSON.stringify(data)}`);
};

const error = ({ message = '', data = {}}) => {
  console.error(`ERROR MESSAGE: ${message} \nDATA: ${JSON.stringify(data)}`);
};

export {
  info,
  error,
}

export default {
  info,
  error,
}