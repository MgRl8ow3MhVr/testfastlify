// Import the framework and instantiate it
import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});

// Declare a route
fastify.get("/", async function handler(request, reply) {
  return { hello: "world" };
});

fastify.route({
  method: "GET",
  url: "/hello",
  schema: {
    // request needs to have a querystring with a `name` parameter
    querystring: {
      type: "object",
      properties: {
        name: { type: "string" },
      },
      required: ["name"],
    },
    // the response needs to be an object with an `hello` property of type 'string'
    response: {
      200: {
        type: "object",
        properties: {
          hello: { type: "string" },
        },
      },
    },
  },
  // this function is executed for every request before the handler is executed
  preHandler: async (request, reply) => {
    // E.g. check authentication
  },
  handler: async (request, reply) => {
    console.log("request.query", request.query);
    console.log("request.params", request.params);
    return { hello: "world" };
  },
});

// Run the server!
try {
  await fastify.listen({ port: 10000 });
  console.log("running on 10000");
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}
