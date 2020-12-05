const MONGO = {
  // I know including connection strings in the public code is dumb but this connection string is for a free cluster and it will expire in 7 days
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
  NUMBER_OF_ENTRIES_ALLOWED: parseInt(process.env.CACHE_NUMBER_OF_ENTRIES_ALLOWED || 100),
  RANDOM_STRING_LENGTH: parseInt(process.env.RANDOM_STRING_LENGTH || 24),
};

export default {
  MONGO,
  SERVER,
  CACHE,
};
