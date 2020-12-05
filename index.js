import express from 'express';
import CONFIG from './config.js';
import { LoggerService } from './services/index.js';
import routes from './routes/index.js';
import models from './models/index.js';

const app = express();

app.get('/health-check', (req, res) => {
  res.status(200).send({ message: 'Service is running!', timestamp: Date.now() });
})

app.use('/api', routes);

app.listen(CONFIG.SERVER.PORT, () => {
  LoggerService.info({ message: `Example app listening`, data: { port: CONFIG.SERVER.PORT } })
});