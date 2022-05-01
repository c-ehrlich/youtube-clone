import express from 'express';
import cookieParser from "cookie-parser";
import cors from 'cors'
import { connectToDatabase, disconnectFromDatabase } from './utils/database';
import logger from './utils/logger';
import { CORS_ORIGIN } from './constants';
import helmet from 'helmet';

const PORT = process.env.PORT || 4000;

const app = express();

app.use(cookieParser());
app.use(express.json()); // replaces bodyparser
app.use(cors({
  origin: CORS_ORIGIN,
  credentials: true,
}))
app.use(helmet());

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
