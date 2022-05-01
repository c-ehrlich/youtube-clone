import express from 'express';
import { connectToDatabase, disconnectFromDatabase } from './utils/database';
import logger from './utils/logger';

const PORT = process.env.PORT || 4000;
const app = express();
const server = app.listen(PORT, async () => {
  await connectToDatabase();
  logger.info(`Server listening at http://localhost:${PORT}`);
});

// graceful shutdown
const signals = ['SIGTERM', 'SIGINT'];
function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    logger.info('Goodbye, got signal', signal);
    server.close();

    await disconnectFromDatabase();

    logger.info('My work here is done');
    process.exit(0);
  });
}
for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
