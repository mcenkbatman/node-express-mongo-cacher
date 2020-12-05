# node-express-mongo-cacher
this is a simple node application that uses express and mongo to make a POC cache server

## endpoints
1. GET /api/v1/cache/:key
2. GET /api/v1/cache
3. POST /api/v1/cache/upsert/:key
4. DELETE /api/v1/cache/:key
5. DELETE /api/v1/cache

you can find more detailed information about endpoints from postman collection link [here](https://www.getpostman.com/collections/25996fa57a7521a716b5)

## environment variables for configurations

none of the environment variables are must (except mongo connection after 2020.12.12)
ENV_VARIABLE_NAME | DEFAULT_VALUE | DESCRIPTION
--- | --- | ---
MONGO_CONNECTION_URI | mongodb+srv://cf-test:JjxEX3W0vgQwNiyx@cluster0.bwu4j.mongodb.net/test?retryWrites=true&w=majority | connection string to your mongodb, the provided one is for a free cluster and has a limited expiry time and you can use it to test until 2020.12.12
MAX_TIME_FOR_QUERY_AS_MS | "5000" | maximum query time for our mongo operations in milli seconds
MONGO_DEBUG | "FALSE" | "TRUE" for enabling mongoose logs in the console for developmental purposes
PORT | "3000" | indicates which port this express server will listen to
TTL_DURATION_AS_SECONDS | "3600" | our cache service's expiration duration in seconds
CACHE_NUMBER_OF_ENTRIES_ALLOWED | "100" | our cache service's maximum allowed entry count
RANDOM_STRING_LENGTH | "24" | the length of the random string which we create when there is a cache miss

## running locally
1. make sure you have node 15 installed
2. npm install
3. npm start (or npm run start-dev for nodemon start)