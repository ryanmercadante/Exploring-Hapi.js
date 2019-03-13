"use strict";

const Hapi = require("hapi");
const Good = require("good");

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

const options = {
  ops: {
    interval: 1000
  },
  reporters: {
    myConsoleReporter: [
      {
        module: "good-squeeze",
        name: "Squeeze",
        args: [{ log: "*", response: "*" }]
      },
      {
        module: "good-console"
      },
      "stdout"
    ]
  }
};

const init = async () => {
  await server.register({
    plugin: require("good"),
    options
  });
  await server.start();
  server.log("info", `Server running at: ${server.info.uri}`);
};

process.on("unhandledRejection", err => {
  server.log(err);
  process.exit(1);
});

init();
