const baseRoutes = {
  name: "base-routes",
  version: "1.0.0",
  register: async (server, options) => {
    // Add 'hello world' route
    server.route({
      method: "GET",
      path: "/",
      handler: (request, h) => {
        return "Hello from base-route.js!";
      }
    });
  }
};

module.exports = baseRoutes;
