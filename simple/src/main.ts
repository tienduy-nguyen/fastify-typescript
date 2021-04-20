import fastify from 'fastify';

const app = fastify({
  trustProxy: true,
  logger: {
    level: 'warn',
  },
});

app.get('/', (req, res) => {
  res.send({ message: 'Hi there!' });
});

app.listen(3000, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
