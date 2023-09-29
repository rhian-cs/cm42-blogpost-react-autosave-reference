import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("tmp/db.json");
const middlewares = jsonServer.defaults();

const PORT = 4000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.use((req, res, next) => {
  if (["PUT", "PATCH"].includes(req.method)) {
    req.body.updatedAt = Date.now();
  }

  next();
});

server.use(router);
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}.`);
});
