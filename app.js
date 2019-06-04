const { responseSchema } = require("./schemas");
const {
  login: { PASSWORD, USERNAME, HARDCODED_PASSWORD, HARDCODED_USERNAME }
} = require("./enum");
const fastify = require("fastify")({ logger: true });

fastify.addSchema(responseSchema);

const option = {
  schema: {
    body: {
      type: "object",
      required: [PASSWORD, USERNAME],
      properties: {
        [PASSWORD]: { type: "string", minLength: 8 },
        [USERNAME]: { type: "string", minLength: 3, maxLength: 30 }
      }
    },
    response: "response#"
  }
};

fastify.post("/", option, async ({ body: { password, username } }, reply) => {
  if (password === HARDCODED_PASSWORD && username === HARDCODED_USERNAME) {
    reply
      .code(200)
      .header("Content-Type", "application/json; charset=utf-8")
      .send({
        error: null,
        message: "OK",
        statusCode: 200
      });
  }
  reply
    .code(401)
    .header("Content-Type", "application/json; charset=utf-8")
    .send({
      error: "Unauthorized",
      message: "Password or username is incorrect",
      statusCode: 401
    });
});

// Run the server!
const start = async () => {
  try {
    await fastify.listen(3000);
    fastify.log.info(`server listening on ${fastify.server.address().port}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
