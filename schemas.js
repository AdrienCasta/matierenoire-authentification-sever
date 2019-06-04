const responseSchema = {
  $id: "response",
  200: {
    type: "object",
    properties: {
      error: { type: "null" },
      message: { type: "string" },
      statusCode: { type: "number" }
    }
  },
  401: {
    type: "object",
    properties: {
      error: { type: "string" },
      message: { type: "string" },
      statusCode: { type: "number" }
    }
  }
};

module.exports = {
  responseSchema
};
