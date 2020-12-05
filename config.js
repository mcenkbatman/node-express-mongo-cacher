const MONGO = {
  URI: process.env.MONGO_CONNECTION_URI || 'mongodb+srv://cf-test:JjxEX3W0vgQwNiyx@cluster0.bwu4j.mongodb.net/test?retryWrites=true&w=majority',
  MAX_TIME_FOR_QUERY_AS_MS: parseInt(process.env.MONGO_MAX_TIME_FOR_QUERY_AS_MS || 5000),
  DEBUG: process.env.MONGO_DEBUG === 'TRUE',
};

const SERVER = {
  PORT: process.env.PORT || 3000,
};

const CACHE = {
  TTL: {
    DURATION_AS_SECONDS: parseInt(process.env.TTL_DURATION_AS_SECONDS || 1 * 60 * 60), // 1 hour as default
  },
  RANDOM_STRING_LENGTH: parseInt(process.env.RANDOM_STRING_LENGTH || 24),
}

export default {
  MONGO,
  SERVER,
  CACHE,
};
