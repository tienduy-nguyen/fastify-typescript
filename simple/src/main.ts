import fastify from 'fastify';

const app = fastify({
  logger: {
    level: 'warn',
  },
});

app.get('/', (req, res) => {
  res.send('Hi there!');
});

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
