const info = ({ message = '', data = {}}) => {
  console.info(`
    ------\n
    INFO MESSAGE: ${message} \n
    DATA: ${JSON.stringify(data)}\n
    ------
  `);
};

const error = ({ message = '', data = {}}) => {
  console.error(`
    ------\n
    ERROR MESSAGE: ${message} \n
    DATA: ${JSON.stringify(data)}\n
    ------
  `);
};

export {
  info,
  error,
}

export default {
  info,
  error,
}