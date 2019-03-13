"use strict";

const Hapi = require("hapi");

const server = Hapi.server({
  port: 3000,
  host: "localhost"
});

// Routes
server.route([
  {
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello World!";
    },
    // the config option doesnt effect the routes functionality, but is helpful and valuable when generating the apps documentation or bringing new developers on board.
    config: {
      description: "Sends a friendly greeting!",
      notes: "No route parameters available",
      tags: ["greeting"]
    }
  },
  {
    method: "POST",
    path: "/",
    handler: (request, h) => {
      // Process the request's payload
      return "Created a new instance";
    }
  }
]);

server.route({
  method: "GET",
  path: "/members/{name?}", // Optional parameters - add a ? to the end - only the last element can be optional
  handler: (request, h) => {
    // we URI encode the name parameter to prevent injection attacks
    return encodeURIComponent(request.params.name)
      ? `Hello ${encodeURIComponent(request.params.name)}`
      : "Hello Stranger";
  }
});

const init = async () => {
  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
