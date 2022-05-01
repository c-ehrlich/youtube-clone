import express from 'express';

const PORT = process.env.PORT || 4000;
const app = express();
const server = app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});

// graceful shutdown
const signals = ['SIGTERM', 'SIGINT'];
function gracefulShutdown(signal: string) {
  process.on(signal, async () => {
    console.log('Goodbye, got signal', signal);
    server.close();

    // TODO: disconnect from the db

    console.log('My work here is done');
    process.exit(0);
  });
}
for (let i = 0; i < signals.length; i++) {
  gracefulShutdown(signals[i]);
}
