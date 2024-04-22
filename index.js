// Import the framework and instantiate it
import Fastify from "fastify";
const fastify = Fastify({
  logger: true,
});
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 3001;
const host = "RENDER" in process.env ? `0.0.0.0` : `localhost`;

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

fastify.get("/html", function (request, reply) {
  reply.type("text/html").send(html);
});

// Run the server!
try {
  await fastify.listen({ host: host, port: port });
  console.log(`running on ${port}`);
} catch (err) {
  fastify.log.error(err);
  process.exit(1);
}

const html = `
<!DOCTYPE html>
<html>
  <head>
    <title>Hello from Render!</title>
    <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"></script>
    <script>
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          disableForReducedMotion: true
        });
      }, 500);
    </script>
    <style>
      @import url("https://p.typekit.net/p.css?s=1&k=vnd5zic&ht=tk&f=39475.39476.39477.39478.39479.39480.39481.39482&a=18673890&app=typekit&e=css");
      @font-face {
        font-family: "neo-sans";
        src: url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/l?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff2"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/d?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("woff"), url("https://use.typekit.net/af/00ac0a/00000000000000003b9b2033/27/a?primer=7cdcb44be4a7db8877ffa5c0007b8dd865b3bbc383831fe2ea177f62257a9191&fvd=n7&v=3") format("opentype");
        font-style: normal;
        font-weight: 700;
      }
      html {
        font-family: neo-sans;
        font-weight: 700;
        font-size: calc(62rem / 16);
      }
      body {
        background: white;
      }
      section {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%);
      }
      section a {
        text-decoration:none;
        color: #1C151A;
      }
      section a:hover {
        text-decoration:none;
        color: #605A5C;
      }
    </style>
  </head>
  <body>
    <section>
      <a href="https://render.com/docs/deploy-node-fastify-app">Hello from Render using Fastify!</a>
    </section>
  </body>
</html>
`;
