const net = require('net');

const ports = [21, 23, 80, 8080, 3306];

ports.forEach(port => {
  const server = net.createServer();
  server.listen(port, () => {
    console.log(`Fake service listening on port ${port}`);
  });
});
